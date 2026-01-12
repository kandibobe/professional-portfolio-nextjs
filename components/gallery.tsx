'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, Maximize2, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface GalleryItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  src: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <LayoutGroup>
      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.21, 1.02, 0.47, 0.98] }}
              key={item.id}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-[2.5rem] bg-secondary border border-border/50"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image Container with Skeleton Loader */}
              <div className="relative overflow-hidden aspect-[3/4]">
                {!item.src.startsWith("bg-") && !loadedImages[item.id] && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  </div>
                )}

                {item.src.startsWith("bg-") ? (
                  <div
                    className={`w-full h-full ${item.src} flex items-center justify-center text-muted-foreground transition-transform duration-1000 ease-out group-hover:scale-110`}
                  >
                    <span className="sr-only">{item.title}</span>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    placeholder={item.blurDataURL ? "blur" : "empty"}
                    blurDataURL={item.blurDataURL}
                    className={cn(
                      "object-cover transition-all duration-1000 ease-out group-hover:scale-110",
                      loadedImages[item.id] ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                    )}
                    onLoad={() => handleImageLoad(item.id)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}

                {/* Elegant Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10 text-white">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white/60">
                      {item.category}
                    </p>
                    <h3 className="text-3xl font-black tracking-tight leading-tight">{item.title}</h3>
                    <div className="h-px w-12 bg-white/30 my-6 transition-all duration-700 group-hover:w-full" />
                    <div className="flex items-center gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white/100 transition-colors"
                      >
                        Quick View <Maximize2 size={12} />
                      </motion.div>
                      
                      <Link 
                        href={`/portfolio/${item.slug}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                        >
                          Read Case Study <ArrowRight size={12} />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-foreground/50 hover:text-foreground transition-colors p-3 rounded-full hover:bg-muted z-[110]"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              <X size={28} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted/20">
                {selectedItem.src.startsWith('bg-') ? (
                  <div className={`w-full h-full ${selectedItem.src} flex items-center justify-center text-muted-foreground text-4xl font-light italic`}>
                    {selectedItem.title}
                  </div>
                ) : (
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center"
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 text-primary/60">{selectedItem.category}</p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{selectedItem.title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
