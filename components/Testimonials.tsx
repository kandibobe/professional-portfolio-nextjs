"use client";

import { Quote } from "lucide-react";
import { FadeInWhenInView } from "./HomeAnimations";

interface TestimonialsProps {
  data: {
    title: string;
    items: { text: string; author: string }[];
  };
}

export function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <FadeInWhenInView>
          <div className="flex flex-col items-center text-center">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">
              Trust
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {data.title}
            </h2>
          </div>
        </FadeInWhenInView>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />
        
        <MarqueeContent items={data.items} />
      </div>
    </section>
  );
}

function MarqueeContent({ items }: { items: { text: string; author: string }[] }) {
  return (
    <div className="flex gap-8 animate-marquee whitespace-nowrap py-8 hover:[animation-play-state:paused]">
      <div className="flex gap-8 min-w-full">
        {items.map((item, idx) => (
          <TestimonialCard key={`1-${idx}`} item={item} />
        ))}
      </div>
      <div className="flex gap-8 min-w-full">
        {items.map((item, idx) => (
          <TestimonialCard key={`2-${idx}`} item={item} />
        ))}
      </div>
      <div className="flex gap-8 min-w-full">
        {items.map((item, idx) => (
          <TestimonialCard key={`3-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: { text: string; author: string } }) {
  return (
    <div className="w-[400px] md:w-[500px] p-8 rounded-3xl bg-secondary/30 border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors whitespace-normal flex flex-col gap-6 group">
      <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors" />
      <p className="text-xl font-medium leading-relaxed text-foreground/90">
        "{item.text}"
      </p>
      <div className="mt-auto pt-6 border-t border-border/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          {item.author.charAt(0)}
        </div>
        <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
          {item.author}
        </span>
      </div>
    </div>
  );
}
