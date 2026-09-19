"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  likes: string[];
}

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "signup";
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  toggleLike: (productId: string) => Promise<boolean>;
  isLiked: (productId: string) => boolean;
  openAuthModal: (tab?: "login" | "signup") => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsAuthModalOpen(false);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (err: any) {
      return { success: false, message: err.message || "An error occurred" };
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsAuthModalOpen(false);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (err: any) {
      return { success: false, message: err.message || "An error occurred" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  };

  const toggleLike = async (productId: string): Promise<boolean> => {
    if (!user) {
      setIsAuthModalOpen(true);
      setAuthModalTab("login");
      return false;
    }

    try {
      const res = await fetch(`/api/products/${productId}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setUser((prev) => (prev ? { ...prev, likes: data.userLikes } : null));
        return data.liked;
      }
    } catch (err) {
      console.error("Like toggle error:", err);
    }
    return false;
  };

  const isLiked = (productId: string): boolean => {
    if (!user || !user.likes) return false;
    return user.likes.includes(productId);
  };

  const openAuthModal = (tab: "login" | "signup" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        authModalTab,
        login,
        signup,
        logout,
        toggleLike,
        isLiked,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
