import { Router, Request, Response } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../shared/utils/middleware";

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: z.string().optional(),
  icon: z.string().optional(),
});

// GET /api/categories
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/categories/:id
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const category = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/categories
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const data = categorySchema.parse(req.body);

    const category = await prisma.category.create({
      data: {
        ...data,
        userId,
      },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    if (error.code === "P2002") {
      return res.status(400).json({ success: false, error: "Category name already exists" });
    }
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// PUT /api/categories/:id
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const data = categorySchema.partial().parse(req.body);

    const category = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    const updated = await prisma.category.update({
      where: { id },
      data,
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// DELETE /api/categories/:id
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const category = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    // Check if category has transactions
    const transactionCount = await prisma.transaction.count({
      where: { categoryId: id },
    });

    if (transactionCount > 0) {
      return res.status(400).json({
        success: false,
        error: "Cannot delete category with transactions. Delete transactions first.",
      });
    }

    await prisma.category.delete({ where: { id } });

    res.json({ success: true, data: { id } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const categoriesRouter = router;
