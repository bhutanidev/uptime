import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "utils/ApiError";
import * as express from "express"

declare global {
  namespace Express {
    interface Request {
      userId:string
    }
  }
}
export const attachUserId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new ApiError(403, "No token found"));
    }

    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };

    if (decoded && typeof decoded === 'object') {
        req.userId = decoded.id as string
      return next();
    } else {
      return next(new ApiError(403, "Not logged in or invalid token"));
    }
  } catch (err) {
    console.error("middleware", err);
    return next(new ApiError(403, "Invalid signature"));
  }
};