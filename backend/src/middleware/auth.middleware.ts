import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import type { Request , Response,NextFunction } from "express";
import { JWT_SECRET } from "../utils/env.js";

interface RequestWithUser extends Request {
  user?: { id: string; role: string };
}

export const authMiddleware = (req: RequestWithUser, res: Response, next : NextFunction) => {
    const token = req.cookies.userToken;
    if (!token) {
        throw new AppError("Unauthorized user !" ,401);
    }
    try {
         const decodeToken = jwt.verify(token, JWT_SECRET) as {id:string , role : string};
         if(!decodeToken){
            throw new AppError("Unauthorized user!",401);
         }
          req.user = decodeToken;
          console.log(req.user , ":from middleware");
          next();
    } catch (error) {
        next(error)
    }
}

export const adminMiddleware = (req:RequestWithUser, res: Response, next:NextFunction )=>{
     if (!req.user) throw new AppError("Unauthorized", 401);
     if (req.user.role !== "ADMIN") {
        throw new AppError("Forbidden: Admins only", 403);
    }
     next();
} 