import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET_KEY || "TOKENparaTRETE",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "TOKENREFRESHparaTRETE",
    expirationHours: 24,
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
