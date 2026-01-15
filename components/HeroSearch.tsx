"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/portfolio?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="relative max-w-md mx-auto mb-16 group"
    >
      <input
        type="text"
        placeholder="Search projects (e.g. Next.js, AI)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-secondary/50 border border-border/50 rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
        Go
      </button>
    </form>
  );
}
