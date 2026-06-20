import { Router } from "express";

import {
  createTool,
  getTools,
  getToolById,
  updateTool,
  deleteTool,
} from "../controllers/tool.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

// prefijo: /api/tools

router.post("/", authMiddleware, adminMiddleware, createTool);

router.get("/", getTools);
router.get("/:id", getToolById);

router.put("/:id", authMiddleware, adminMiddleware, updateTool);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTool);

export default router;