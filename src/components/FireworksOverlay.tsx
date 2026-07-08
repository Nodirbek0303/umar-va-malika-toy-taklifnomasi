import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCw } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  friction: number;
}

interface Rocket {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  color: string;
  trail: { x: number; y: number }[];
}

export default function FireworksOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [triggered, setTriggered] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Elegant colors matching the wedding's natural gold, olive, sage & rose tones
  const palette = [
    "#C5A059", // Natural Gold
    "#E8C86B", // Soft Warm Gold
    "#606C38", // Natural Olive
    "#A3AD85", // Elegant Sage
    "#CCD5AE", // Olive Pale
    "#DDA15E", // Rich Ochre
    "#F5E6E8", // Soft Rose
  ];

  // Initialize and size the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set up the animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Clear with slight trailing alpha for elegant motion blur
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      // Update and draw rockets
      const rockets = rocketsRef.current;
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        
        // Add trail point
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        // Move rocket
        r.x += r.vx;
        r.y += r.vy;

        // Draw trail
        ctx.beginPath();
        if (r.trail.length > 0) {
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          for (let j = 1; j < r.trail.length; j++) {
            ctx.lineTo(r.trail[j].x, r.trail[j].y);
          }
        }
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Check if rocket reached or passed its target peak
        if (r.vy >= -1 || r.y <= r.ty) {
          // Explode!
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Add subtle radial glow for golden or rose particles
        if (p.color === "#C5A059" || p.color === "#E8C86B") {
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
        }
        
        ctx.fill();
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const createExplosion = (x: number, y: number, color: string) => {
    const particleCount = 45 + Math.floor(Math.random() * 30);
    const particles = particlesRef.current;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5.5;
      
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: 1 + Math.random() * 2.2,
        decay: 0.012 + Math.random() * 0.015,
        gravity: 0.06,
        friction: 0.98,
      });
    }
  };

  const launchRocket = (startX: number, targetX: number, targetY: number, color: string) => {
    const startY = window.innerHeight + 10;
    const dy = targetY - startY;
    const dx = targetX - startX;
    
    // Calculate approximate initial upward velocity needed to reach targetY
    // using basic physics formulas with simplified values
    const gravity = 0.06;
    const time = 45 + Math.random() * 15;
    const vy = dy / time;
    const vx = dx / time;

    rocketsRef.current.push({
      x: startX,
      y: startY,
      tx: targetX,
      ty: targetY,
      vx,
      vy,
      color,
      trail: [],
    });
  };

  // Trigger a full romantic sequence of fireworks
  const triggerCelebrationSequence = () => {
    setTriggered(true);
    setShowToast(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const launchCount = 12;
    for (let i = 0; i < launchCount; i++) {
      setTimeout(() => {
        const startX = canvas.width * 0.15 + Math.random() * (canvas.width * 0.7);
        const targetX = startX + (Math.random() * 160 - 80);
        const targetY = canvas.height * 0.15 + Math.random() * (canvas.height * 0.45);
        const color = palette[Math.floor(Math.random() * palette.length)];
        launchRocket(startX, targetX, targetY, color);
      }, i * 400); // launch staggeredly every 400ms
    }

    // Hide toast indicator after a brief period
    setTimeout(() => {
      setShowToast(false);
    }, 5500);
  };

  // Track scroll position to fire at the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (triggered) return;

      const threshold = 120; // pixels from the bottom
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;

      if (totalHeight - scrollPosition <= threshold) {
        triggerCelebrationSequence();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggered]);

  // Click handler to manually spark beautiful rockets!
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const startX = clickX + (Math.random() * 100 - 50);
    const color = palette[Math.floor(Math.random() * palette.length)];
    launchRocket(startX, clickX, clickY, color);
  };

  return (
    <>
      {/* Full-screen Canvas Overlay for Fireworks */}
      <canvas
        id="fireworks-canvas"
        ref={canvasRef}
        className="pointer-events-auto fixed inset-0 z-45 h-full w-full opacity-85 select-none"
        style={{ mixBlendMode: "screen", pointerEvents: triggered ? "auto" : "none" }}
        onClick={handleCanvasClick}
      />

      {/* Celebration floating notification toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3.5 rounded-full border border-natural-gold-soft bg-white/95 px-6 py-3 shadow-[0_15px_40px_rgba(96,108,56,0.15)] backdrop-blur-md"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-natural-gold/10 text-natural-gold animate-bounce">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-sm font-bold text-natural-olive leading-tight">
                Tabriklarimiz! 🎉
              </span>
              <span className="font-sans text-[10px] font-semibold text-natural-text/60">
                Ekranni bosib, mushaklar otishingiz mumkin
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tiny celebratory indicator near RSVP/Footer if already triggered once, permitting manual re-runs */}
      {triggered && (
        <div className="flex justify-center py-4">
          <button
            id="btn-relaunch-fireworks"
            onClick={triggerCelebrationSequence}
            className="inline-flex items-center gap-2 rounded-full border border-natural-gold-soft/40 bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-natural-olive hover:bg-natural-olive/5 transition-all duration-300 shadow-xs active:scale-95 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3 animate-spin-slow" />
            <span>Mushakbozlikni qayta boshlash</span>
          </button>
        </div>
      )}
    </>
  );
}
