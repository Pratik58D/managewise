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

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/user/login", form);
            toast.success("Logged in");
            console.log(res.data);

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
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
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id='password'
                                    placeholder='Passsword'
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <Button type='submit' className='w-full'>
                                    Login
                                </Button>
                                <Button variant="outline" type="button">
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