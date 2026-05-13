import { Router, Request, Response } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../shared/utils/middleware";

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const categoriaSchema = z.object({
  nome: z.string().min(1, "O nome da categoria é obrigatório"),
  color: z.string().optional(),
  icon: z.string().optional(),
});

// GET /api/categorias
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const categorias = await prisma.categoria.findMany({
      where: { userId },
      orderBy: { nome: "asc" },
    });

    return res.json({ success: true, data: categorias });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/categorias/:id
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?.id;

    const categoria = await prisma.categoria.findFirst({
      where: { id, userId },
    });

    if (!categoria) {
      return res.status(404).json({ success: false, error: "Categoria não encontrada" });
    }

    return res.json({ success: true, data: categoria });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/categorias
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const data = categoriaSchema.parse(req.body);

    const categoria = await prisma.categoria.create({
      //cria a categoria associada ao usuário autenticado utilizando os dados validados do corpo da requisição
      data: { ...data, userId: userId! },
    });

    return res.status(201).json({ success: true, data: categoria });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    if (error.code === "P2002") {
      return res.status(400).json({ success: false, error: "Uma categoria com esse nome já existe" });
    }
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// PUT /api/categorias/:id
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?.id;
    const data = categoriaSchema.partial().parse(req.body);

    const categoria = await prisma.categoria.findFirst({
      where: { id, userId },
    });

    if (!categoria) {
      return res.status(404).json({ success: false, error: "Categoria não encontrada" });
    }

    const updated = await prisma.categoria.update({
      where: { id },
      data,
    });

    return res.json({ success: true, data: updated });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// DELETE /api/categorias/:id
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?.id;

    const categoria = await prisma.categoria.findFirst({
      where: { id, userId },
    });

    if (!categoria) {
      return res.status(404).json({ success: false, error: "Categoria não encontrada" });
    }

    // verifica se a categoria tem movimentacoes
    const movimentacaoCount = await prisma.movimentacao.count({
      where: { categoriaId: id },
    });

    if (movimentacaoCount > 0) {
      return res.status(400).json({
        success: false,
        error: "Não é possível excluir a categoria com movimentações existentes. Exclua as movimentações primeiro.",
      });
    }

    await prisma.categoria.delete({ where: { id } });

    return res.json({ success: true, data: { id } });

  } catch (error) {

    return res.status(500).json({ success: false, error: "Internal server error" });

  }
});

export const categoriasRouter = router;
