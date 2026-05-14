import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../shared/utils/middleware";

const prisma = new PrismaClient();
const router = Router();

// GET /api/relatorios/mensal
router.get("/mensal", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    // Validar se userId existe
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { ano = new Date().getFullYear(), mes = new Date().getMonth() + 1 } = req.query;

    const startDate = new Date(Number(ano), Number(mes) - 1, 1);
    const endDate = new Date(Number(ano), Number(mes), 0, 23, 59, 59);

    // Get movimentacoes
    const movimentacoes = await prisma.movimentacao.findMany({
      where: {
        userId,
        data: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { categoria: true },
    });

    // Calculate totals
    const receita = movimentacoes
      .filter((t) => t.tipo === "receita")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    const despesa = movimentacoes
      .filter((t) => t.tipo === "despesa")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    // Group by categoria com tipos corretos
    const porCategoria = movimentacoes.reduce(
      (acc, t) => {
        const cat = t.categoria.nome;
        if (!acc[cat]) {
          acc[cat] = { total: 0, tipo: t.tipo, movimentacoes: [] };
        }
        acc[cat].total += Number(t.quantia);
        acc[cat].movimentacoes.push(t);
        return acc;
      },
      {} as Record<string, { total: number; tipo: string; movimentacoes: typeof movimentacoes }>
    );

    return res.json({
      success: true,
      data: {
        period: `${ano}-${String(mes).padStart(2, "0")}`,
        summary: {
          receita,
          despesa,
          saldo: receita - despesa,
        },
        porCategoria,
        movimentacoes,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/relatorios/anual
router.get("/anual", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    // Validar se userId existe
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { ano = new Date().getFullYear() } = req.query;

    const startDate = new Date(Number(ano), 0, 1);
    const endDate = new Date(Number(ano), 11, 31, 23, 59, 59);

    const movimentacoes = await prisma.movimentacao.findMany({
      where: {
        userId,
        data: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { categoria: true },
    });

    // Calculate totals
    const receita = movimentacoes
      .filter((t) => t.tipo === "receita")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    const despesa = movimentacoes
      .filter((t) => t.tipo === "despesa")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    // agrupamento por mes
    const porMes = Array(12)
      .fill(null)
      .reduce(
        (acc, _, i) => {
          const mes = String(i + 1).padStart(2, "0");
          acc[mes] = {
            receita: 0,
            despesa: 0,
            saldo: 0,
          };
          return acc;
        },
        {} as Record<string, { receita: number; despesa: number; saldo: number }>
      );

    movimentacoes.forEach((t) => {
      const mes = String(t.data.getMonth() + 1).padStart(2, "0");
      if (t.tipo === "receita") {
        porMes[mes].receita += Number(t.quantia);
      } else {
        porMes[mes].despesa += Number(t.quantia);
      }
      porMes[mes].saldo = porMes[mes].receita - porMes[mes].despesa;
    });

    return res.json({
      success: true,
      data: {
        ano,
        summary: {
          receita,
          despesa,
          saldo: receita - despesa,
        },
        porMes,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const relatoriosRouter = router;
