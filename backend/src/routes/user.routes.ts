import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

router.post("/signup",(req,res) => userController.signup(req,res));
router.post("/login", (req,res)=> userController.login(req,res));

export default router;
