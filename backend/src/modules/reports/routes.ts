import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../shared/utils/middleware";

const prisma = new PrismaClient();
const router = Router();

// GET /api/reports/monthly
router.get("/monthly", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { year = new Date().getFullYear(), month = new Date().getMonth() + 1 } = req.query;

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

    // Get transactions
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { category: true },
    });

    // Calculate totals
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Group by category
    const byCategory = transactions.reduce(
      (acc, t) => {
        const cat = t.category.name;
        if (!acc[cat]) {
          acc[cat] = { total: 0, type: t.type, transactions: [] };
        }
        acc[cat].total += Number(t.amount);
        acc[cat].transactions.push(t);
        return acc;
      },
      {} as Record<string, any>
    );

    res.json({
      success: true,
      data: {
        period: `${year}-${String(month).padStart(2, "0")}`,
        summary: {
          income,
          expense,
          balance: income - expense,
        },
        byCategory,
        transactions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/reports/annual
router.get("/annual", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { year = new Date().getFullYear() } = req.query;

    const startDate = new Date(Number(year), 0, 1);
    const endDate = new Date(Number(year), 11, 31, 23, 59, 59);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { category: true },
    });

    // Calculate totals
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Group by month
    const byMonth = Array(12)
      .fill(null)
      .reduce(
        (acc, _, i) => {
          const monthKey = String(i + 1).padStart(2, "0");
          acc[monthKey] = {
            income: 0,
            expense: 0,
            balance: 0,
          };
          return acc;
        },
        {} as Record<string, any>
      );

    transactions.forEach((t) => {
      const monthKey = String(t.date.getMonth() + 1).padStart(2, "0");
      if (t.type === "income") {
        byMonth[monthKey].income += Number(t.amount);
      } else {
        byMonth[monthKey].expense += Number(t.amount);
      }
      byMonth[monthKey].balance = byMonth[monthKey].income - byMonth[monthKey].expense;
    });

    res.json({
      success: true,
      data: {
        year,
        summary: {
          income,
          expense,
          balance: income - expense,
        },
        byMonth,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const reportsRouter = router;
