"use client";

import { motion } from "framer-motion";
import { GradientButton } from "../ui/GradientButton";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cognivex-blue/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cognivex-purple/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cognivex-purple text-xs font-bold uppercase tracking-widest"
        >
          <Sparkles size={14} />
          The Intelligence Layer for Careers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
        >
          Architect Your <br />
          <span className="gradient-text">Future Self.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/50 max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed"
        >
          Cognivex uses advanced semantic intelligence and ATS heuristics to transform your professional profile into a high-performance career asset.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <GradientButton className="text-lg px-10 py-5">
            Get Started
            <ArrowRight size={20} />
          </GradientButton>
          <GradientButton variant="outline" className="text-lg px-10 py-5">
            See the Engine
          </GradientButton>
        </motion.div>
      </div>

      {/* Floating Elements (Subtle 3D placeholders) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};
