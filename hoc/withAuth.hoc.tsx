"use client";

import PageLoadingSkeleton from "@/components/common/ui/page-loading-skeleton";
import { useAuth } from "@/hooks/auth.hook";
import { Role } from "@/types/enum.types";
import { useRouter } from "next/navigation";
import { type ComponentType, useEffect } from "react";
import { toast } from "react-toastify";

const withAuth = <P extends object>(
  Component: ComponentType<P>,
  roles?: Role[],
) => {
  const ProtectedComponent = (props: P) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const hasRequiredRole =
      !roles ||
      Boolean(
        user &&
          roles.some(
            (role) =>
              role.toLowerCase() === String(user.role).toLowerCase(),
          ),
      );

    useEffect(() => {
      if (isLoading) return;

      if (!user) {
        toast.error("Login required to access this page", {
          toastId: "auth-login-required",
        });
        router.replace("/auth/login");
        return;
      }

      if (!hasRequiredRole) {
        toast.error("You cannot access this page", {
          toastId: "auth-role-required",
        });
        router.replace("/");
      }
    }, [hasRequiredRole, isLoading, router, user]);

    if (isLoading) {
      return <PageLoadingSkeleton />;
    }

    if (!user || !hasRequiredRole) {
      return null;
    }

    return <Component {...props} />;
  };

  ProtectedComponent.displayName = `withAuth(${Component.displayName ?? Component.name ?? "Component"})`;

  return ProtectedComponent;
};

export default withAuth;
