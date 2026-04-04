import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = "access_secret";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "No token provided",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(token, ACCESS_SECRET);

    req.user = decoded; // attach user to request

    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
      data: null,
    });
  }
};