"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, X, Lock, Mail, User as UserIcon } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, authModalTab, closeAuthModal, login, signup, openAuthModal } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setError("");
    setPassword("");
    setShowPassword(false);
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (authModalTab === "login") {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message || "Invalid credentials");
      }
    } else {
      if (!name.trim()) {
        setError("Please enter your name");
        setSubmitting(false);
        return;
      }
      if (email.toLowerCase().trim() === "admin@1234.com") {
        setError("Admin accounts cannot be created via Sign Up. Please Sign In using admin credentials.");
        setSubmitting(false);
        return;
      }
      const res = await signup(name, email, password);
      if (!res.success) {
        setError(res.message || "Registration failed");
      }
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-blush-200"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-maroon transition-colors rounded-full hover:bg-blush-50"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="px-6 pt-8 pb-4 text-center bg-ivory">
            <h2
              className="text-2xl font-semibold text-maroon mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {authModalTab === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-xs text-text-muted">
              {authModalTab === "login"
                ? "Sign in to manage your likes & preferences"
                : "Join ELAROSE to save your favorite luxury handmade products"}
            </p>

            {/* Tabs */}
            <div className="flex mt-6 bg-blush-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  authModalTab === "login"
                    ? "bg-white text-maroon shadow-sm"
                    : "text-text-muted hover:text-maroon"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  authModalTab === "signup"
                    ? "bg-white text-maroon shadow-sm"
                    : "text-text-muted hover:text-maroon"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl text-center font-medium leading-relaxed">
                {error}
              </div>
            )}

            {authModalTab === "signup" && (
              <div>
                <label className="block text-xs font-medium text-text mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-text"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-text mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-text"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-maroon transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 bg-maroon text-white font-medium text-sm rounded-xl hover:bg-maroon-950 transition-colors shadow-md disabled:opacity-50"
            >
              {submitting
                ? "Processing..."
                : authModalTab === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Footer note */}
          <div className="px-6 py-4 bg-blush-50 border-t border-blush-200 text-center text-xs text-text-muted">
            {authModalTab === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => openAuthModal("signup")}
                  className="text-maroon font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => openAuthModal("login")}
                  className="text-maroon font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
