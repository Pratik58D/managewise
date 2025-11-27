"use client"

import React, { useState } from 'react'
import { axiosInstance } from '@/lib/axios';
import { cn } from "@/lib/utils"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
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
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const [form, setForm] = useState({ email: "", password: "" });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/user/login", form);
            toast.success("Logged in");
            setForm({ email: "", password: "" })
            router.push("/dashboard")

            console.log(res.data);

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
        };
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className='p-6 border rounded-lg w-[350px] sapce-y-4'
                    >
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id='email'
                                    name="email"
                                    placeholder="abc@example.com"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="/forget-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id='password'
                                    name='password'
                                    placeholder='Passsword'
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <Button type='submit' className='w-full'>
                                    Login
                                </Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
                                >
                                    Login with Google
                                </Button>



                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="signup">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

        </div>

    )
}

export default LoginForm