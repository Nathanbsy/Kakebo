import { Router, Request, Response } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../shared/utils/middleware";
import { TransactionData } from "../../shared/types";

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const transactionSchema = z.object({
  categoryId: z.string(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().optional(),
  date: z.string(),
  type: z.enum(["income", "expense"]),
  method: z.enum(["cash", "card", "bank_transfer"]).optional(),
});

// GET /api/transactions
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 20 } = req.query;

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: { category: true },
      orderBy: { date: "desc" },
    });

    const total = await prisma.transaction.count({ where: { userId } });

    res.json({
      success: true,
      data: transactions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/transactions/:id
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
      include: { category: true },
    });

    if (!transaction) {
      return res.status(404).json({ success: false, error: "Transaction not found" });
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/transactions
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const data = transactionSchema.parse(req.body);

    // Verify category belongs to user
    const category = await prisma.category.findFirst({
      where: { id: data.categoryId, userId },
    });

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        userId,
        date: new Date(data.date),
        amount: BigInt(Math.round(data.amount * 100)) as any,
      },
      include: { category: true },
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// PUT /api/transactions/:id
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const data = transactionSchema.partial().parse(req.body);

    // Verify transaction belongs to user
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ success: false, error: "Transaction not found" });
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
        amount: data.amount ? (BigInt(Math.round(data.amount * 100)) as any) : undefined,
      },
      include: { category: true },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// DELETE /api/transactions/:id
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ success: false, error: "Transaction not found" });
    }

    await prisma.transaction.delete({ where: { id } });

    res.json({ success: true, data: { id } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const transactionsRouter = router;
