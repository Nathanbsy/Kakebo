import * as jwt from "jsonwebtoken";
import { JWTPayload } from "../types";
import { Request, Response } from "express";
import { config } from "../../config";

export const tokenUtils = {
  verifyToken: (token: string): JWTPayload => {
    return jwt.verify(token, config.jwt.secret) as JWTPayload;
  },

  decodeToken: (token: string): JWTPayload | null => {
    return jwt.decode(token) as JWTPayload | null;
  },

  refreshToken: (req: Request, res: Response): string => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw { statusCode: 401, message: "Missing refresh token" };
    }

    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as JWTPayload;
      const payload: JWTPayload = { id: decoded.id, email: decoded.email };
      
      return jwt.sign(payload, config.jwt.secret, { expiresIn: "24h" });
    } catch (error) {
      throw { statusCode: 401, message: "Invalid refresh token" };
    }
  }
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
