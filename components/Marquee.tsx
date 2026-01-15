"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
}

export function Marquee({ items, direction = "left" }: MarqueeProps) {
  return (
    <div className="relative flex overflow-hidden bg-white/[0.02] border-y border-white/5 py-10">
      <motion.div
        className="flex whitespace-nowrap gap-20"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop" as const,
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white/10 hover:text-primary/40 transition-colors italic flex items-center gap-10"
          >
            {item}
            <span className="w-4 h-4 rounded-full bg-primary/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
