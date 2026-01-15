"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Zap } from "lucide-react";

export function RealTimeMonitor() {
  const [commits, setCommits] = useState<any[]>([]);

  useEffect(() => {
    // In a real scenario, this would be a WebSocket connection
    const interval = setInterval(() => {
      const newCommit = {
        id: Math.random(),
        repo: "professional-portfolio",
        msg: "Optimizing WebGL Shaders...",
        time: new Date().toLocaleTimeString(),
      };
      setCommits((prev) => [newCommit, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="text-primary animate-pulse" size={20} />
          <span className="text-sm font-black uppercase tracking-widest text-white">Live Activity</span>
        </div>
        <div className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-tighter">
          Live
        </div>
      </div>
      
      <div className="space-y-4">
        {commits.map((c) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={c.id}
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
          >
            <Zap size={14} className="mt-1 text-primary" />
            <div>
              <p className="text-xs font-bold text-slate-300">{c.msg}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] font-black uppercase text-slate-500">{c.repo}</span>
                <span className="text-[10px] font-black uppercase text-slate-600">@{c.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {commits.length === 0 && (
          <p className="text-xs text-slate-500 italic">Waiting for incoming data stream...</p>
        )}
      </div>
    </div>
  );
}
