"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Database, GitBranch, Shield, Zap, LucideIcon } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative group lg:block hidden perspective-1000">
      {/* Background Glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-primary/30 via-blue-500/20 to-transparent rounded-full blur-[100px] opacity-60 animate-pulse-slow" />
      
      {/* Main Glass Card */}
      <motion.div 
        initial={{ opacity: 0, rotateX: 10, rotateY: -10 }}
        animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative p-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden aspect-[4/3] transform transition-transform duration-500 hover:scale-[1.02]"
      >
         <div className="absolute inset-0 bg-slate-950/80" />
         
         {/* Grid Background */}
         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
         
         {/* Animated Content */}
         <div className="relative h-full w-full p-8 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex justify-between items-center">
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
               </div>
               <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-muted-foreground">
                  system_status: active
               </div>
            </div>

            {/* Central Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-64 h-64">
                  {/* Rotating Rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-primary/20 border-dashed"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border border-blue-500/20 border-dotted"
                  />
                  
                  {/* Central Node */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                        <Cpu className="w-10 h-10 text-white" />
                     </div>
                  </div>

                  {/* Floating Icons */}
                  <FloatingIcon icon={Database} angle={0} delay={0} />
                  <FloatingIcon icon={Activity} angle={72} delay={1} />
                  <FloatingIcon icon={GitBranch} angle={144} delay={2} />
                  <FloatingIcon icon={Shield} angle={216} delay={3} />
                  <FloatingIcon icon={Zap} angle={288} delay={4} />
               </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-4 mt-auto">
               <StatCard label="Accuracy" value="99.8%" color="text-green-400" />
               <StatCard label="Latency" value="<12ms" color="text-blue-400" />
               <StatCard label="Uptime" value="100%" color="text-purple-400" />
            </div>
         </div>
      </motion.div>
    </div>
  );
}

function FloatingIcon({ icon: Icon, angle, delay }: { icon: LucideIcon, angle: number, delay: number }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-lg"
      animate={{
        x: [
          Math.cos((angle * Math.PI) / 180) * 100,
          Math.cos((angle * Math.PI) / 180) * 110,
          Math.cos((angle * Math.PI) / 180) * 100,
        ],
        y: [
          Math.sin((angle * Math.PI) / 180) * 100,
          Math.sin((angle * Math.PI) / 180) * 110,
          Math.sin((angle * Math.PI) / 180) * 100,
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <Icon className="w-5 h-5 text-slate-400" />
    </motion.div>
  );
}

function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
       <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider mb-1">{label}</div>
       <div className={`text-xl font-mono font-bold ${color}`}>{value}</div>
    </div>
  );
}
