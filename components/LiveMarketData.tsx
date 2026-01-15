"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";

export function LiveMarketData() {
  const [prices, setPrices] = useState<any>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd");
        const data = await res.json();
        setPrices(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!prices) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {Object.entries(prices).map(([id, data]: [string, any]) => (
        <motion.div
          whileHover={{ y: -5 }}
          key={id}
          className="flex-shrink-0 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md min-w-[160px]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp size={14} className="text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{id}</span>
          </div>
          <p className="text-xl font-bold text-white">${data.usd.toLocaleString()}</p>
        </motion.div>
      ))}
    </div>
  );
}
