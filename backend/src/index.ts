import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { authMiddleware, errorMiddleware } from "./shared/utils/middleware";
import { authRouter } from "./modules/auth/routes";
import { movimentacoesRouter } from "./modules/movimentacoes/routes";
import { categoriasRouter } from "./modules/categorias/routes";
import { relatoriosRouter } from "./modules/relatorios/routes";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// rotas
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Kakeibo API is rodando",
    version: "0.1.0",
  });
});

app.get("/saude", (req, res) => {
  res.json({ success: true, status: "ok" });
});

// rotas da API
const apiPrefix = config.api.prefix;

app.use(`${apiPrefix}/auth`, authRouter);
app.use(`${apiPrefix}/movimentacoes`, authMiddleware, movimentacoesRouter);
app.use(`${apiPrefix}/categorias`, authMiddleware, categoriasRouter);
app.use(`${apiPrefix}/relatorios`, authMiddleware, relatoriosRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Rota não encontrada" });
});

// middleware de erro
app.use(errorMiddleware);

// configurando a porta do servidor
const PORT = config.api.port;

app.listen(PORT, () => {
  console.log(`API rodando na porta: ${PORT}`);
});
export default app;
