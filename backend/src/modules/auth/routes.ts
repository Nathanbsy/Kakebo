import { Router, Request, Response } from "express";
//importando o z do zod, ferramenta na qual utilizamos para validar os dados de entrada
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { AuthResponse } from "../../shared/types";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import Cookies from "js-cookie";

const prisma = new PrismaClient();
const router = Router();

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
  nome: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, nome } = registerSchema.parse(req.body);

    // Verifica se o usuario já existe
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Usuário já existe" });
    }

    // criptografa a senha do usuário utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria o usuario
    const user = await prisma.usuario.create({
      data: { email, senha: hashedPassword, nome },
    });

    // gera o token de autenticação
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: "24h" });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, config.jwt.refreshSecret, { expiresIn: "7d" });
    
    const response: AuthResponse = {
      token,
      refreshToken,
      user: { id: user.id, email: user.email, nome: user.nome },
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
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, error: "Credenciais inválidas" });
    }

    // comparando a senha criptografada com a senha fornecida
    const isCorrectPassword = await bcrypt.compare(password, user.senha);
    if (!isCorrectPassword) {
      return res.status(401).json({ success: false, error: "Credenciais inválidas" });
    }

    // gera o token de autenticação
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: "24h" });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, config.jwt.refreshSecret, { expiresIn: "7d" });


    const response: AuthResponse = {
      token,
      refreshToken,
      user: { id: user.id, email: user.email, nome: user.nome },
    };

    return res.json({ success: true, data: response });
    
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/refresh", async (req: Request, res: Response) => {
  try {
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) {
      return res.status(401).json({ success: false, error: "Refresh token não fornecido" });
    }

    const decoded: any = jwt.verify(refreshToken, config.jwt.refreshSecret);
    const user = await prisma.usuario.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ success: false, error: "Usuário não encontrado" });
    }

    // gera um novo token de autenticação
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: "24h" });

    const response: AuthResponse = {
      token,
      refreshToken,
      user: { id: user.id, email: user.email, nome: user.nome },
    };

    Cookies.set("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: 1, 
    });

    return res.json({ success: true, data: response });
  }
  catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const authRouter = router;