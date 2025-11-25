"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  token?: string;
  email?: string;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!token || !email) {
      toast.error("Invalid or expired reset link.");
      return;
    }
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        email,
        newPassword,
      });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg w-[350px] space-y-4"
    >
      <Input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </form>
  );
}
