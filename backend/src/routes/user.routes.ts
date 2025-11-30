import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();



// auth
router.post("/signup",userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// forget+ resetPassword

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password" , userController.resetPassword);


// test route
router.get("/admin-only", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome admin!" });
});

export default router;
