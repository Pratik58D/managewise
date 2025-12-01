import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// admin only
router.post("/", authMiddleware, adminMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, adminMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

export default router;
