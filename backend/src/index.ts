import express from "express";
import cors from "cors";
import "express-async-errors";
import { config } from "./config";
import { authMiddleware, errorMiddleware } from "./shared/utils/middleware";
import { authRouter } from "./modules/auth/routes";
import { transactionsRouter } from "./modules/transactions/routes";
import { categoriesRouter } from "./modules/categories/routes";
import { reportsRouter } from "./modules/reports/routes";

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Kakeibo API is running",
    version: "0.1.0",
  });
});

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

// API Routes
const apiPrefix = config.api.prefix;

app.use(`${apiPrefix}/auth`, authRouter);
app.use(`${apiPrefix}/transactions`, authMiddleware, transactionsRouter);
app.use(`${apiPrefix}/categories`, authMiddleware, categoriesRouter);
app.use(`${apiPrefix}/reports`, authMiddleware, reportsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error middleware
app.use(errorMiddleware);

// Start server
const PORT = config.api.port;

app.listen(PORT, () => {
  console.log(`✅ Kakeibo API running on http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/docs (coming soon)`);
  console.log(`🗄️  Database: ${config.database.url.replace(/:[^:]*@/, ":****@`)}`);
});

export default app;
