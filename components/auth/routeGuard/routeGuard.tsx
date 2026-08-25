"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/authContext";
import { roleToRoutePath } from "@/lib/auth/roleToRouteSegment";

interface RouteGuardProps {
  children: ReactNode;
}

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAdminPath(pathname: string): boolean {
  return pathname.startsWith("/admin");
}

/**
 * Client-side route guard. Next.js Middleware cannot run under
 * `output: "export"` (no server runtime at request time), so protection for
 * `/dashboard/*` and `/admin/*` happens here: on mount / pathname change,
 * check the auth state resolved by AuthProvider and redirect away from
 * protected paths that the current session isn't allowed on.
 */
export function RouteGuard({ children }: RouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, status } = useAuth();

  useEffect(() => {
    // Status hasn't resolved from localStorage yet - don't redirect
    // prematurely on a status that might still turn out authenticated.
    if (status === "idle") return;
    if (!isProtectedPath(pathname)) return;

    if (status === "unauthenticated") {
      router.replace("/");
      return;
    }

    if (isAdminPath(pathname) && user?.role !== "admin") {
      router.replace(user ? roleToRoutePath(user.role) : "/");
    }
  }, [status, pathname, user, router]);

  if (isProtectedPath(pathname)) {
    if (status === "idle") return null;
    if (status === "unauthenticated") return null;
    if (isAdminPath(pathname) && user?.role !== "admin") return null;
  }

  return <>{children}</>;
}
