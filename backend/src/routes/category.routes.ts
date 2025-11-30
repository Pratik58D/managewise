import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";

const router = Router()

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, categoryController.createCategory);
router.put("/:id", authMiddleware, adminMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, categoryController.deleteCategory);


// Public routes
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

export default router;