"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

interface ResetPasswordFormProps {
  token?: string;
  email?: string;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({token})
    console.log({email})
    if (!token || !email) {
      toast.error("Invalid or expired reset link.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("password doesnot match")
      return
    }
    try {
      const res = await axiosInstance.post("/user/reset-password", {
        token,
        email,
        newPassword,
      });
      toast.success(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
              err.response?.data?.message ||
              err.response?.data?.error ||
              "Something went wrong";
               toast.error(message);
      } else {
        toast.error("unexpected error occurred");
      }

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg w-[350px] space-y-4"
    >
      <label>New Password</label>
      <Input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label >Confirm Password</label>
      <Input
        placeholder="confirm the password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </form>
  );
}
