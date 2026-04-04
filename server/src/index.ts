import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized" });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});