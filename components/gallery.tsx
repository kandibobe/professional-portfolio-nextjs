'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FsLightbox from 'fslightbox-react';

interface GalleryProps {
  items: Array<{
    id: string | number;
    src: string;
    title: string;
    category: string;
  }>;
}

export function Gallery({ items }: GalleryProps) {
  const [toggler, setToggler] = useState(false);
  const [productIndex, setProductIndex] = useState(0);

  const openLightboxOnIndex = (index: number) => {
    setProductIndex(index);
    setToggler(!toggler);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
            className="group cursor-pointer relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/30 shadow-lg hover:shadow-2xl transition-shadow duration-500"
            onClick={() => openLightboxOnIndex(index)}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
              <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-2">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <FsLightbox
        toggler={toggler}
        sources={items.map((item) => item.src)}
        sourceIndex={productIndex}
      />
    </>
  );
}
