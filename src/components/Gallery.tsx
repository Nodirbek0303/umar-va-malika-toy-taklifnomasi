/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Heart } from "lucide-react";

interface Photo {
  id: number;
  url: string;
  caption: string;
  category: string;
}

const PHOTOS: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    caption: "Tantana arafasida go'zal bezatilgan bog'",
    category: "Tyorlik",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    caption: "Bizning ilk samimiy va baxtli kulgularimiz",
    category: "Yoshlar",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=800",
    caption: "Oltin quyosh botishi ostidagi romantik sayr",
    category: "Sevgi",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    caption: "Kuyov va kelinning nafis nigohi",
    category: "Yoshlar",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    caption: "Hayotiy rishtalar va nikoh uzuklari ramzi",
    category: "Tantana",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
    caption: "Sokin tabiat qo'ynidagi beg'ubor quchoq",
    category: "Sevgi",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1544078751-58fed2b84d57?auto=format&fit=crop&q=80&w=800",
    caption: "Sening ko'zlaringda cheksiz yorug'lik",
    category: "Tantana",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
    caption: "Eng quvonchli lahzalar va do'stlar tabrigi",
    category: "Tantana",
  },
];

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Handle keyboard navigation for the lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  const handlePrev = () => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev === 0 ? PHOTOS.length - 1 : prev - 1) : null
    );
  };

  const handleNext = () => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev === PHOTOS.length - 1 ? 0 : prev + 1) : null
    );
  };

  return (
    <div id="gallery-section-container" className="space-y-8 animate-fade-in">
      {/* Header */}
      <div id="gallery-header" className="text-center">
        <h3 id="gallery-title" className="font-serif text-2xl font-bold tracking-wide text-natural-olive">
          Bizning Shirin Damlarimiz
        </h3>
        <p id="gallery-subtitle" className="mt-1 text-xs text-natural-text/70">
          Kuyov va kelinning eng go'zal, samimiy va unutilmas baxtli lahzalari
        </p>
      </div>

      {/* Masonry Grid */}
      <div
        id="gallery-masonry"
        className="columns-2 sm:columns-3 gap-4 space-y-4"
      >
        {PHOTOS.map((photo, index) => (
          <div
            key={photo.id}
            id={`gallery-item-${photo.id}`}
            onClick={() => setSelectedIdx(index)}
            className="break-inside-avoid relative overflow-hidden rounded-2xl border border-natural-gold-soft/35 bg-white p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-natural-text/50 via-natural-text/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="self-end rounded-full bg-white/20 p-1.5 backdrop-blur-xs">
                  <ZoomIn className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block rounded-full bg-natural-gold/80 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                    {photo.category}
                  </span>
                  <p className="font-serif text-xs italic line-clamp-2 drop-shadow-sm">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Love Note */}
      <div
        id="gallery-note"
        className="mx-auto max-w-md rounded-2xl border border-dashed border-natural-gold-soft/50 bg-white/40 p-4 text-center"
      >
        <p className="font-serif text-xs italic text-natural-text/70 flex items-center justify-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-natural-gold fill-natural-gold/20" />
          "Har bir lahza sen bilan go'zal, har bir kun sen bilan bayram..."
        </p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-natural-text/95 p-4 backdrop-blur-md"
            id="gallery-lightbox"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close Button */}
            <button
              id="lightbox-close-btn"
              onClick={() => setSelectedIdx(null)}
              className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Lightbox Content Container */}
            <div
              className="relative flex max-w-4xl w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Controls */}
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 active:scale-95"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 active:scale-95"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Main Image */}
              <div className="relative max-h-[70vh] sm:max-h-[75vh] w-full flex justify-center items-center select-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40">
                <motion.img
                  key={selectedIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={PHOTOS[selectedIdx].url}
                  alt={PHOTOS[selectedIdx].caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain"
                />
              </div>

              {/* Caption Footer */}
              <div className="mt-4 w-full text-center text-white px-8">
                <span className="inline-block rounded-full bg-natural-gold px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  {PHOTOS[selectedIdx].category}
                </span>
                <p className="mt-2 font-serif text-sm sm:text-base italic text-white/90">
                  "{PHOTOS[selectedIdx].caption}"
                </p>
                <p className="mt-1 text-[10px] text-white/40 tracking-widest uppercase">
                  {selectedIdx + 1} / {PHOTOS.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
