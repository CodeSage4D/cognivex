import { Hero } from "@/components/sections/Hero";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Cpu, FileCheck, Target, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      
      {/* Feature Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedCard delay={0.1}>
            <div className="p-3 rounded-xl bg-cognivex-blue/10 text-cognivex-blue w-fit mb-6">
              <FileCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">ATS Compatibility</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Deep-scan your resume against industrial ATS algorithms to ensure 100% readability.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="p-3 rounded-xl bg-cognivex-purple/10 text-cognivex-purple w-fit mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Semantic Matching</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              AI-driven skill extraction that understands context, not just keywords.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Assistant</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Real-time suggestions to improve bullet points and professional summaries.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 w-fit mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Match Score</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Get a breakdown of how well you align with specific job descriptions.
            </p>
          </AnimatedCard>
        </div>
      </section>

      {/* Social Proof / Footer Placeholder */}
      <footer className="w-full py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          Powered by Cognivex Neural Engine v1.0
        </p>
      </footer>
    </main>
  );
}
