import express from "express";
import { googleCallback } from "../controllers/googlesignin.controller.js";

const router = express.Router();

console.log(process.env.GOOGLE_REDIRECT_URI,"fetched url")

router.get("/auth/google", (req, res) => {
  const redirectURL = 
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      response_type: "code",
      scope: "email profile",
      access_type: "offline",
      prompt: "consent",
    });

  res.redirect(redirectURL);
});

router.get("/auth/google/callback",googleCallback);


export default router;
