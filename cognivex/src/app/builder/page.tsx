"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Sparkles, 
  ChevronLeft, 
  Download, 
  History,
  Languages
} from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import Link from "next/link";

export default function ResumeBuilder() {
  return (
    <div className="min-h-screen bg-cognivex-dark flex flex-col">
      {/* Builder Header */}
      <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-cognivex-dark/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
            <ChevronLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <h2 className="font-bold">AI Resume Architect</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-white/40 hover:text-white transition-colors">
            <History size={20} />
          </button>
          <GradientButton className="py-2.5 px-6">
            <Download size={18} />
            Export PDF
          </GradientButton>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Editor (Simulated) */}
        <div className="lg:col-span-12 p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-12 pb-24">
            
            {/* Template Header */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center space-y-4"
            >
              <h1 className="text-4xl font-black">Jane Doe</h1>
              <p className="text-white/40 text-sm tracking-widest uppercase font-bold">Senior Machine Learning Engineer</p>
            </motion.div>

            {/* Experience Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="font-black uppercase tracking-widest text-xs">Experience</h3>
                <button className="text-[10px] font-black uppercase text-cognivex-blue hover:underline">+ Add Row</button>
              </div>
              
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">Lead AI Architect · <span className="text-white/40">Nexus Systems</span></h4>
                      <span className="text-xs font-bold text-white/20">2021 — PRESENT</span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-colors relative">
                        <p className="text-sm text-white/60 leading-relaxed">
                          Orchestrated the deployment of large-scale RAG pipelines reducing latency by 45%. Optimized transformer inference for real-time edge processing.
                        </p>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cognivex-blue/10 text-cognivex-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] font-black uppercase">
                          <Sparkles size={14} />
                          AI Polish
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* AI Assistant Overlay (Simulated) */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[600px] glass-card p-6 shadow-2xl border-cognivex-blue/20 flex items-center gap-6"
            >
              <div className="bg-cognivex-blue/10 p-3 rounded-2xl text-cognivex-blue">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">AI Suggestion</p>
                <p className="text-sm text-white font-medium">Use "Quantifiable impact" for your Nexus Systems role to increase ATS score by 12%.</p>
              </div>
              <GradientButton className="py-2 px-4 text-xs">Apply Change</GradientButton>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
