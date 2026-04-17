"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Cpu, 
  Zap,
  LayoutDashboard,
  BrainCircuit,
  MessageSquare,
  Search,
  Settings,
  Bell,
  LogOut,
  ChevronRight
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScoreMeter } from "@/components/ui/ScoreMeter";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: FileText, label: "Resume Builder", active: false },
  { icon: Search, label: "Job Matching", active: false },
  { icon: MessageSquare, label: "AI Consultant", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-cognivex-dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cognivex-blue to-cognivex-purple flex items-center justify-center font-black">C</div>
          <span className="font-black tracking-tight text-xl">Cognivex</span>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.active ? "bg-white/5 text-cognivex-blue border border-white/10" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-white/20 hover:text-rose-500 transition-colors text-sm font-bold mt-auto">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight">Intelligence Dashboard</h2>
          <div className="flex items-center gap-6">
            <button className="text-white/40 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-cognivex-dark"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">JD</div>
          </div>
        </header>

        <div className="p-8 lg:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!hasResult ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-3xl mx-auto text-center"
              >
                <div className="mb-12">
                  <h1 className="text-4xl font-black mb-4 tracking-tight">Initiate Career Scan</h1>
                  <p className="text-white/40 max-w-md mx-auto">Upload your existing profile to begin the neural decomposition and matching process.</p>
                </div>

                <div 
                  className={`glass-card p-12 border-dashed border-2 transition-all ${isAnalyzing ? 'border-cognivex-blue bg-cognivex-blue/5' : 'border-white/5'}`}
                >
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center py-12">
                      <div className="w-16 h-16 rounded-full border-4 border-cognivex-blue/20 border-t-cognivex-blue animate-spin mb-6" />
                      <p className="text-sm font-black uppercase tracking-widest text-cognivex-blue">Analyzing Vector Space...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white/20">
                        <Upload size={32} />
                      </div>
                      <p className="font-bold text-lg mb-2">Drag and drop profile</p>
                      <p className="text-white/20 text-sm mb-8">PDF, DOCX up to 10MB</p>
                      <GradientButton onClick={startAnalysis} className="px-12">
                        Select File
                      </GradientButton>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-4">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight mb-2">Analysis Complete.</h2>
                    <p className="text-white/40 flex items-center gap-2 text-sm">
                      <BrainCircuit size={16} className="text-cognivex-blue" />
                      Engine version 1.0.4-aura active
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <GradientButton variant="outline">Download Repot</GradientButton>
                    <GradientButton>Optimize Profile</GradientButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatedCard className="flex items-center justify-center">
                    <ScoreMeter score={87} label="ATS COMPATIBILITY" />
                  </AnimatedCard>
                  
                  <AnimatedCard className="flex items-center justify-center">
                    <ScoreMeter score={92} label="SKILL ALIGNMENT" />
                  </AnimatedCard>

                  <AnimatedCard className="flex flex-col justify-center p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-cognivex-blue/10 text-cognivex-blue">
                        <Zap size={20} />
                      </div>
                      <h4 className="font-black uppercase tracking-widest text-xs text-white/40">Market Value</h4>
                    </div>
                    <p className="text-4xl font-black mb-2">$145k - $160k</p>
                    <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                      <ChevronRight size={14} className="rotate-[-90deg]" /> 12% above average
                    </p>
                  </AnimatedCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <AnimatedCard className="lg:col-span-8">
                    <h3 className="text-lg font-bold mb-6">Semantic Skill Map</h3>
                    <div className="flex flex-wrap gap-2">
                       {["Python", "FastAPI", "Next.js", "Transformers", "AWS", "Docker", "SBERT", "CI/CD", "PostgreSQL"].map((skill, i) => (
                         <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium hover:border-cognivex-blue/50 transition-colors cursor-default">
                           {skill}
                         </div>
                       ))}
                    </div>
                  </AnimatedCard>

                  <AnimatedCard className="lg:col-span-4">
                    <h3 className="text-lg font-bold mb-6">Critical Gaps</h3>
                    <div className="space-y-4">
                       {[
                         { label: "Infrastructure as Code", color: "text-rose-500" },
                         { label: "Graph Databases", color: "text-amber-500" }
                       ].map((gap, i) => (
                         <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                           <span className="text-sm font-bold">{gap.label}</span>
                           <div className={`w-2 h-2 rounded-full ${gap.color.replace('text', 'bg')}`} />
                         </div>
                       ))}
                    </div>
                  </AnimatedCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
