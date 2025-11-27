import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../utils/env.js";
import type { Request,Response,NextFunction } from "express";

export const googleCallback = async (req:Request, res:Response, next :NextFunction) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: "Missing code" });

    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code: code as string,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token } = tokenRes.data;
    const googleUser = JSON.parse(Buffer.from(id_token.split(".")[1], "base64").toString());
    const { email, name, picture } = googleUser;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        avatar: picture,
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  } catch (err) {
    next(err);
  }
};
