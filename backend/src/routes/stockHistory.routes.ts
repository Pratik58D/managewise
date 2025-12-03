import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/",authMiddleware , )
router.get("/",authMiddleware , )
router.get("/:id",authMiddleware , )
router.put("/:id",authMiddleware , )
router.delete("/:id",authMiddleware , )

export default router;