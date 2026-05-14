import { Request, Response, NextFunction } from "express";
import { tokenUtils } from ".";
import { JWTPayload } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      res.status(401).json({ success: false, error: "Missing or invalid token" });
      return;
    }

    const decoded = tokenUtils.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};
