import { Router, Request, Response } from "express";
//importando o z do zod, ferramenta na qual utilizamos para validar os dados de entrada
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { AuthResponse } from "../../shared/types";
import jwt from "jsonwebtoken";

const JWT_SECRET = "tokenparatestes";

const prisma = new PrismaClient();
const router = Router();

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
  name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    // Verifica se o usuario já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Usuário já existe" });
    }

    // criptografa a senha do usuário utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria o usuario
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    // gera o token de autenticação
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });

    const response: AuthResponse = {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };

    return res.status(201).json({ success: true, data: response });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // encontra o usuario pelo email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, error: "Credenciais inválidas" });
    }

    // comparando a senha criptografada com a senha fornecida
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ success: false, error: "Credenciais inválidas" });
    }

    // gera o token de autenticação
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });


    const response: AuthResponse = {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };

    return res.json({ success: true, data: response });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const authRouter = router;
