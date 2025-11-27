import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"
import { AppError } from '../utils/AppError.js'
import { JWT_SECRET } from '../utils/env.js'
import type { Request, Response, NextFunction } from 'express'
import crypto from "crypto";
import { sentResetPasswordEmail } from '../services/email.service.js'

class UserController {
    // signup
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password, role } = req.body;

            const existUser = await User.findOne({ email });
            if (existUser) throw new AppError('Email already in use', 409);

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
            })
            return res.status(201).json({
                sucess: true,
                data: user,
            })
        } catch (error) {
            next(error);
        }
    }

    // login

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) throw new AppError("Invalid email or passsword", 401);

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new AppError("invalid email or password");

            const token = jwt.sign(
                { id: user._id, role: user.role },
                JWT_SECRET,
                { expiresIn: "1d" }
            )

            return res.json({
                success: true,
                token,
            });

        } catch (error) {
            next(error)
        }
    }

    // forgot password
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });
            if (!user) throw new AppError("User not found", 404);

            // Generate reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenHash = await bcrypt.hash(resetToken, 10);

            // Store hashed token and expiry in DB
            user.resetPasswordToken = resetTokenHash;
            user.resetPasswordExpires=new Date(Date.now() + 2 * 60 * 1000);

            await user.save();
            
            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;

            // console.log({resetLink})
      
            // TODO: send email with link: `${FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`
             // send email with Resend

            await sentResetPasswordEmail(email , resetLink)

            return res.json({
                success: true,
                message: "Password reset link sent to email."
            })
        } catch (error) {
            next(error);

        }
    }

    // Reset Password
    // /reset-password?token=abcdefghijkl&email=test@gmail.com  :: reset link

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, token, newPassword } = req.body;

            if (!token || !email || !newPassword) throw new AppError("Missing required fields", 400)

            const user = await User.findOne({ email })
            if (!user) throw new AppError("Invalid request", 400);


           if(!user.resetPasswordToken || !user.resetPasswordExpires){
            throw new AppError("Invalid or expired",400);
           }

            if (Date.now() > user.resetPasswordExpires.getTime()){
                throw new AppError("Reset token expired", 400);
            }

            const isValid = await bcrypt.compare(token, user.resetPasswordToken);
            if (!isValid) throw new AppError("Invalid reset token", 400);

            // Update password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password  = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();

            return res.json({ 
                success: true, 
                message: "Password successfully reset."
             });
        } catch (error) {
            next(error);
        }
    }
}


export default new UserController();