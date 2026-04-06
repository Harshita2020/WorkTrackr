import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { successResponse, errorResponse } from "../utils/response";

const router = Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation 
    if (!email || !password) {
      return errorResponse(res, "Missing fields", 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse(res, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return successResponse(res, "User registered successfully", user, 201);
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

//LOGIN
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return successResponse(res, "Login successful", {
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

export default router;
