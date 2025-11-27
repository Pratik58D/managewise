"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    }
  }, [token]);

  return <p>Logging you in…</p>;
}
