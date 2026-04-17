"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

export const GradientButton = ({ 
  children, 
  onClick, 
  className, 
  variant = "primary",
  disabled = false 
}: GradientButtonProps) => {
  const variants = {
    primary: "bg-gradient-to-r from-cognivex-blue to-cognivex-purple text-white",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    outline: "border border-white/20 text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05, boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)" }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
};
