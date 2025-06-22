// src/hooks/useAuthRedirect.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthRedirect = (redirectTo: string = "/") => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // مهم جدًا علشان الكوكي تبعت
        });

        const data = await res.json();

        if (!data.user) {
          router.replace(redirectTo);
        }
      } catch (err) {
        console.log(err);
        router.replace(redirectTo);
      }
    };

    checkAuth();
  }, [router, redirectTo]);
};
