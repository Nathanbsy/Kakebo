import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { authMiddleware } from "../../shared/utils/middleware";

const prisma = new PrismaClient();
const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    console.log("Token recebido:", token); // Log do token recebido
   

    try {
        const decoded: any = jwt.verify(token, config.jwt.secret);
        const user = await prisma.usuario.findUnique({ where: { id: decoded.id }, select: { email: true, nome: true, rendaMensal: true, metaEconomiaMensal: true } });
        console.log("Usuário encontrado:", user);
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(401).json({ success: false, error: "Token de autenticação inválido" });
    }
});

router.put("/", authMiddleware, async (req: Request, res: Response) => {
    const token = req.cookies.access_token;

    try {
        const decoded: any = jwt.verify(token, config.jwt.secret);
        const { nome, email, rendaMensal, metaEconomiaMensal } = req.body;
        const updatedUser = await prisma.usuario.update({
            where: { id: decoded.id },
            data: { nome, email, rendaMensal, metaEconomiaMensal, dataAtualizacao: new Date() },
        });
        return res.json({ success: true, user: updatedUser });
    } catch (error) {
        return res.status(401).json({ success: false, error: "Token de autenticação inválido" });
    }
});

export const usuarioRouter = router;