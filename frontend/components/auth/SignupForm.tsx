"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { axiosInstance } from "@/lib/axios"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(form.password !== confirmPassword){
        toast.error("Passwords donot match");
        return
      }
      const res = await axiosInstance.post("/user/signup", form);
      toast.success("Account created successfully!");
      setForm({ name: "", email: "", password: ""})
      setConfirmPassword("");
      console.log(res.data);
      router.push("/login")
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ram Devkota"
                  onChange={handleChange}
                  value={form.name}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="abc@example.com"
                  value={form.email}
                  onChange={handleChange}

                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e)=> setConfirmPassword(e.target.value)}
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>    
    </div>
  )
}
