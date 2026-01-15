"use client";

import { motion } from "framer-motion";
import { useState, ElementType } from "react";

interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

export function GlitchText({ text, as: Tag = "span", className }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;

  return (
    <Component
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 text-primary opacity-70 z-0"
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -1, 0] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-red-500 opacity-70 z-0"
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </Component>
  );
}
