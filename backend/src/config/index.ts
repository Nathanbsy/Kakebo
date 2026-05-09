import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || "mysql://user:password@localhost:3306/kakeibo",
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET_KEY || "your-secret-key-change-in-production",
    expirationHours: parseInt(process.env.JWT_EXPIRATION_HOURS || "24"),
  },

  // API
  api: {
    port: parseInt(process.env.API_PORT || "8000"),
    prefix: process.env.API_PREFIX || "/api",
    nodeEnv: process.env.NODE_ENV || "development",
  },

  // CORS
  cors: {
    origin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(","),
    credentials: true,
  },

  // Analytics Service
  analytics: {
    serviceUrl: process.env.ANALYTICS_SERVICE_URL || "http://localhost:8001",
  },
};
