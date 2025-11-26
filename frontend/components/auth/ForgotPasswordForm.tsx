"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      const res = await axiosInstance.post("/user/forgot-password", { email });
      toast.success(res.data.message);
      setEmail("");
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
      className="p-6  bg-white shadow-lg rounded-lg w-[350px] space-y-4"
    >
      <p className="text-center text-lg capitalize font-semibold">forgot-password</p>
      <Input
        placeholder="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>
    </form>
  );
}
