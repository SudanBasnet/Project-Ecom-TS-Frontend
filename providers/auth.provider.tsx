"use client";

import { getProfile, logoutAccount } from "@/api/auth.api";
import AuthContext from "@/contexts/auth.context";
import { clearAuthSession } from "@/lib/auth-session";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const queryClient = useQueryClient();
  const { data: user, isError, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError) {
      clearAuthSession();
    }
  }, [isError]);

  const logout = async () => {
    await logoutAccount();
    clearAuthSession();
    queryClient.setQueryData(["me"], null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: Boolean(user),
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
