import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth.middleware";
import { successResponse, errorResponse } from "../utils/response";

const taskRoutes = Router();
// Create a new task
taskRoutes.post("/", authMiddleware, async (req: any, res) => {
  try {
    const { title } = req.body;

   
    if (!title || !title.trim()) {
      return errorResponse(res, "Title is required", 400);
    }

    const task = await prisma.task.create({
      data: {
        title,
        userId: req.user.userId,
      },
    });

    return successResponse(res, "Task created", task, 201);
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

// Get all tasks for the authenticated user
taskRoutes.get("/", authMiddleware, async (req: any, res) => {
  try {
    const { page = "1", limit = "100", status, search } = req.query;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    const where: any = {
      userId: req.user.userId,
    };

    if (status) {
      where.completed = status === "true";
    }

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: [
        { completed: "asc" }, 
        { createdAt: "desc" },
      ],
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    return successResponse(res, "Tasks fetched", tasks);
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

// Get a single task by ID
taskRoutes.get("/:id", authMiddleware, async (req: any, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    return successResponse(res, "Task fetched", task);
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

// Update a task
taskRoutes.patch("/:id", authMiddleware, async (req: any, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title },
    });

    return successResponse(res, "Task updated", updatedTask);
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

// Delete a task
taskRoutes.delete("/:id", authMiddleware, async (req: any, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    await prisma.task.delete({
      where: { id },
    });

    return successResponse(res, "Task deleted");
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

//Toggle Task
taskRoutes.patch("/:id/toggle", authMiddleware, async (req: any, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });

    return successResponse(res, "Task toggled", updatedTask);
  } catch (err: any) {
    return errorResponse(res, "Server error", 500, err.message);
  }
});

export default taskRoutes;
