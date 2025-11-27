import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

// auth
router.post("/signup",userController.signup);
router.post("/login", userController.login);

// forget+ resetPassword

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password" , userController.resetPassword);

export default router;
