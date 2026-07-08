/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    alt: "Umar va Malika - Go'zal tantana arafasida",
  },
  {
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
    alt: "Umar va Malika - Shirin suhbatlar",
  },
  {
    url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200",
    alt: "Umar va Malika - Birgalikdagi sayr",
  },
  {
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200",
    alt: "Umar va Malika - Quyosh botishidagi baxt",
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    alt: "Umar va Malika - Oila baxti",
  }
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // cycle every 5 seconds

    return () => clearInterval(timer);
  }, [index]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  // Variants for fade-in & slide crossfade
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div
      id="hero-carousel-container"
      className="relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl border border-natural-gold-soft/40 shadow-md group"
    >
      {/* Background Image Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 }
            }}
            src={CAROUSEL_IMAGES[index].url}
            alt={CAROUSEL_IMAGES[index].alt}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          />
        </AnimatePresence>
      </div>

      {/* Luxury Soft Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none" />

      {/* Manual Controls - visible on hover */}
      <button
        id="btn-carousel-prev"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-natural-text opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white active:scale-95 shadow-xs"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        id="btn-carousel-next"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-natural-text opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white active:scale-95 shadow-xs"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Text Info Overlay */}
      <div className="absolute inset-0 z-15 flex flex-col items-center justify-end p-6 text-center pointer-events-none">
        <span className="rounded-full bg-natural-olive/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-natural-olive border border-natural-olive/20 backdrop-blur-xs">
          Tashrifnoma
        </span>
        <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-bold text-natural-olive drop-shadow-xs">
          Umar & Malika
        </h2>
        <p className="mt-1 font-serif text-xs tracking-wider text-natural-text/85">
          Hayotimizning unutilmas go'zal tantanasi
        </p>

        {/* Indicators */}
        <div className="mt-4 flex gap-1.5 pointer-events-auto">
          {CAROUSEL_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === i ? "w-4 bg-natural-olive" : "w-1.5 bg-natural-olive/35 hover:bg-natural-olive/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
