import { Router, Request, Response } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../shared/utils/middleware";
import { MovimentacaoData } from "../../shared/types";

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const movimentacaoSchema = z.object({
  categoriaId: z.string(),

  quantia: z.coerce
    .number()
    .positive("A quantia deve ser positiva"),

  descricao: z.string().optional(),

  data: z.coerce.date(),

  tipo: z.enum(["Receita", "Despesa"]),

  metodo: z.enum([
    "dinheiro",
    "cartão",
    "transferência bancária",
    "pix"
  ]).optional(),
});


// GET /api/movimentacoes
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 20 } = req.query;

    const movimentacoes = await prisma.movimentacao.findMany({
      where: { userId },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: { categoria: true },
      orderBy: { data: "desc" },
    });

    const total = await prisma.movimentacao.count({ where: { userId } });

    return res.json({
      success: true,
      data: movimentacoes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/movimentacoes/:id
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?.id;

    const movimentacao = await prisma.movimentacao.findFirst({
      where: { id, userId },
      include: { categoria: true },
    });

    if (!movimentacao) {
      return res.status(404).json({ success: false, error: "Movimentação não encontrada" });
    }

    return res.json({ success: true, data: movimentacao });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/movimentacoes
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const data = movimentacaoSchema.parse(req.body);

    // Verificar se a categoria pertence ao usuário
    const categoria = await prisma.categoria.findFirst({
      where: { id: data.categoriaId, userId },
    });

    if (!categoria) {
      return res.status(404).json({ success: false, error: "Categoria não encontrada" });
    }

    const movimentacao = await prisma.movimentacao.create({
      data: {
        ...data,
        userId: userId!,
        data: new Date(data.data),
        quantia: data.quantia, 
      },
      include: { categoria: true },
    });

    return res.status(201).json({ success: true, data: movimentacao });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// PUT /api/movimentacoes/:id
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?.id;
    const data = movimentacaoSchema.partial().parse(req.body);

    // Verify movimentacao belongs to user
    const movimentacao = await prisma.movimentacao.findFirst({
      where: { id, userId },
    });

    if (!movimentacao) {
      return res.status(404).json({ success: false, error: "Movimentação não encontrada" });
    }

    const updated = await prisma.movimentacao.update({
      where: { id },
      data: {
        ...data,
        data: data.data ? new Date(data.data) : undefined,
        quantia: data.quantia ? (BigInt(Math.round(data.quantia * 100)) as any) : undefined,
      },
      include: { categoria: true },
    });

    return res.json({ success: true, data: updated });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// DELETE /api/movimentacoes/:id
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?.id;

    const movimentacao = await prisma.movimentacao.findFirst({
      where: { id, userId },
    });

    if (!movimentacao) {
      return res.status(404).json({ success: false, error: "Movimentação não encontrada" });
    }

    await prisma.movimentacao.delete({ where: { id } });

    return res.json({ success: true, data: { id } });

  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const movimentacoesRouter = router;
