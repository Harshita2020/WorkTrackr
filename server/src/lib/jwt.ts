import jwt from "jsonwebtoken";

const ACCESS_SECRET = "access_secret"; // later move to .env
const REFRESH_SECRET = "refresh_secret";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
};