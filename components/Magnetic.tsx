"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/lib/hooks/useMagnetic";

export function Magnetic({ children }: { children: React.ReactNode }) {
    const { ref, x, y } = useMagnetic();

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
        >
            {children}
        </motion.div>
    );
}
