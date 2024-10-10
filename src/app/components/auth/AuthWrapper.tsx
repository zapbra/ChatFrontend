"use client";
import { CookieObject, CookieService } from "@/classes/database/CookieService";
import { Children } from "react";
import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  authenticated: boolean;
  userCookies: CookieObject | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthWrapper = ({
  children,
  value,
}: Readonly<{
  children: React.ReactNode;
  value: AuthContextType;
}>) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthWrapper;
