"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";


export default function Page({
  searchParams,
}: {
  searchParams: { token?: string; email?: string };
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <ResetPasswordForm token={searchParams.token} email={searchParams.email} />
    </div>
  );
}
