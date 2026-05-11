import * as jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "your-secret-key-change-in-production";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION_HOURS || "24";

export const tokenUtils = {
  verifyToken: (token: string): JWTPayload => {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  },

  decodeToken: (token: string): JWTPayload | null => {
    return jwt.decode(token) as JWTPayload | null;
  },
};

export const errorHandler = (error: any): { statusCode: number; message: string } => {
  if (error.name === "ZodError") {
    return { statusCode: 400, message: error.errors[0].message };
  }
  if (error.message === "Invalid token") {
    return { statusCode: 401, message: "Unauthorized" };
  }
  if (error.statusCode) {
    return { statusCode: error.statusCode, message: error.message };
  }
  return { statusCode: 500, message: "Internal server error" };
};

export const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
