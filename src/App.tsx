/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Calendar, Clock, MapPin, Gift, ChevronDown, BookOpen, Utensils } from "lucide-react";
import Countdown from "./components/Countdown";
import RsvpForm from "./components/RsvpForm";
import WishesWall from "./components/WishesWall";
import MapSection from "./components/MapSection";
import MusicPlayer from "./components/MusicPlayer";
import Gallery from "./components/Gallery";
import HeroCarousel from "./components/HeroCarousel";
import FireworksOverlay from "./components/FireworksOverlay";

// Fade & slide up section wrapper for elegant scrolling
const ScrollSection = ({ children, id }: { children: React.ReactNode; id: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-120px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="scroll-mt-24 space-y-6"
  >
    {children}
  </motion.section>
);

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [musicShouldPlay, setMusicShouldPlay] = useState(false);
  const [refreshWishes, setRefreshWishes] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  // Generate romantic floating petals for background ambient effect
  useEffect(() => {
    const generatedPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0% to 100% of viewport width
      delay: Math.random() * 8,  // staggered delay
      duration: 10 + Math.random() * 15, // speed of falling
      size: 8 + Math.random() * 16, // size of petal
    }));
    setPetals(generatedPetals);
  }, []);

  // Simple and highly effective scrollspy tracking active visible section
  useEffect(() => {
    if (!isOpened) return;

    const handleScroll = () => {
      const sections = ["home", "couple", "gallery", "schedule", "venue", "rsvp"];
      const scrollPosition = window.scrollY + 220; // offset for sticky menu

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpened]);

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    setMusicShouldPlay(true); // Auto-play music upon active interaction
    
    // Smooth timing delay for envelope animations to play before showing invitation
    setTimeout(() => {
      setIsOpened(true);
    }, 1300);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRsvpSuccess = () => {
    // Increment trigger to refresh WishesWall
    setRefreshWishes((prev) => prev + 1);
  };

  // Nav items in Uzbek
  const tabs = [
    { id: "home", label: "Tashrif" },
    { id: "couple", label: "Yoshlar" },
    { id: "gallery", label: "Galereya" },
    { id: "schedule", label: "Dastur" },
    { id: "venue", label: "Manzil" },
    { id: "rsvp", label: "Tilaklar" },
  ];

  return (
    <div id="app-root-container" className="relative min-h-screen w-full overflow-x-hidden bg-natural-bg text-natural-text font-sans selection:bg-natural-gold/20 selection:text-natural-text">
      
      {/* Background radial dot grid pattern */}
      <div className="absolute inset-0 bg-pattern opacity-35 pointer-events-none z-0" />

      {/* Background ambient light sage and soft moss mesh circles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-natural-olive-light rounded-full blur-[100px] opacity-40 animate-pulse-slow" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-natural-olive-pale rounded-full blur-[120px] opacity-45 animate-pulse-slow" />
      </div>

      {/* Floating Animated Golden & Olive Petals */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute top-[-20px] rounded-full bg-gradient-to-tr from-natural-gold/15 to-natural-olive/5 animate-float"
            style={{
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* ================= GORGEOUS INTERACTIVE PHYSICAL ENVELOPE ================= */
          <motion.div
            key="envelope-opener"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -120, scale: 0.98 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="relative z-50 flex min-h-screen w-full flex-col items-center justify-center p-4 bg-[#F9F7F2] select-none overflow-hidden"
          >
            {/* Elegant luxury internal card layout border */}
            <div className="absolute inset-4 sm:inset-8 rounded-3xl border border-natural-gold-soft/25 p-2 pointer-events-none">
              <div className="h-full w-full rounded-2xl border border-natural-gold-soft/10" />
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-8 left-8 h-12 w-12 border-t border-l border-natural-gold-soft/30 rounded-tl-2xl" />
            <div className="absolute top-8 right-8 h-12 w-12 border-t border-r border-natural-gold-soft/30 rounded-tr-2xl" />
            <div className="absolute bottom-8 left-8 h-12 w-12 border-b border-l border-natural-gold-soft/30 rounded-bl-2xl" />
            <div className="absolute bottom-8 right-8 h-12 w-12 border-b border-r border-natural-gold-soft/30 rounded-br-2xl" />

            {/* Main physical envelope structure */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] flex flex-col justify-center items-center">
              
              {/* Outer backing wrapper with soft shadows */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-3xl shadow-[0_25px_60px_rgba(74,69,62,0.18)] border border-natural-gold-soft/15 overflow-hidden"
                animate={envelopeOpened ? { scale: 0.94, y: 15 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                {/* Subtle internal lining ornament pattern */}
                <div className="absolute inset-2.5 rounded-[20px] border border-natural-gold-soft/20 bg-[#FAF8F3] p-6 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-25" />
                  
                  {/* Internal card - slides out beautifully of the envelope container */}
                  <motion.div
                    className="absolute inset-x-4 top-4 bottom-4 rounded-xl bg-white border border-natural-gold-soft/30 shadow-md p-6 flex flex-col justify-between items-center text-center z-10"
                    initial={{ y: 0 }}
                    animate={envelopeOpened ? { y: -200, scale: 0.95 } : { y: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    <div className="space-y-1 mt-6">
                      <span className="font-sans text-[8px] tracking-[0.25em] font-bold text-natural-gold block uppercase">
                        TAKLIFNOMA
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-natural-olive tracking-wide">
                        Umar & Malika
                      </h3>
                      <div className="h-[1px] w-12 bg-natural-gold-soft/40 mx-auto my-3.5" />
                      <p className="font-mono text-[9px] text-natural-text/60 tracking-widest font-semibold">
                        29 . 07 . 2026 · 09:00
                      </p>
                    </div>

                    <div className="text-center font-cursive text-3xl text-natural-gold py-2">
                      Sizni lutfan taklif etamiz...
                    </div>

                    <div className="w-9 h-9 rounded-full border border-natural-gold-soft/30 flex items-center justify-center text-natural-olive/35 mb-4">
                      <Heart className="h-4 w-4 fill-current animate-pulse" />
                    </div>
                  </motion.div>

                  {/* Right flap mask */}
                  <div 
                    className="absolute inset-y-0 right-0 w-1/2 bg-white border-l border-natural-gold-soft/20 z-20"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
                  />
                  
                  {/* Left flap mask */}
                  <div 
                    className="absolute inset-y-0 left-0 w-1/2 bg-white border-r border-natural-gold-soft/20 z-20"
                    style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}
                  />

                  {/* Bottom flap mask */}
                  <div 
                    className="absolute bottom-0 inset-x-0 h-[60%] bg-white border-t border-natural-gold-soft/20 z-20"
                    style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
                  />

                  {/* Top animated opening triangle flap */}
                  <motion.div 
                    className="absolute top-0 inset-x-0 h-[58%] bg-[#FAF8F4] border-b border-natural-gold-soft/25 z-25 shadow-xs"
                    style={{ 
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transformOrigin: "top"
                    }}
                    animate={envelopeOpened ? { rotateX: 110, y: -25, opacity: 0 } : { rotateX: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                  
                </div>
              </motion.div>

              {/* Glowing Interactive Wax Seal in the center of flaps */}
              <motion.div
                className="absolute z-30 cursor-pointer flex flex-col items-center justify-center"
                style={{ top: "52%", left: "50%", transform: "translate(-50%, -50%)" }}
                animate={envelopeOpened ? { scale: 0.85, opacity: 0, y: -40 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onClick={handleOpenEnvelope}
              >
                {/* Gold aura animation */}
                <div className="absolute h-24 w-24 rounded-full bg-natural-gold/20 animate-ping opacity-60" />
                <div className="absolute h-20 w-20 rounded-full bg-natural-gold-soft/30 blur-xs" />
                
                {/* Physical-like Burgundy Wax Seal */}
                <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-[#831A1F] border border-[#9A2227] shadow-[0_12px_28px_rgba(131,26,31,0.45)] active:scale-95 transition-all duration-200 hover:brightness-110">
                  <div className="absolute inset-1.5 rounded-full border border-[#C5A059]/40 flex items-center justify-center">
                    <span className="font-cursive text-2xl text-[#E8C86B] font-bold leading-none mb-1">
                      UM
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Tap prompt and text */}
            <motion.div
              className="mt-12 text-center space-y-2.5 z-10"
              animate={envelopeOpened ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-serif text-base font-bold tracking-wider text-natural-text">
                Umar & Malika
              </p>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-natural-gold animate-pulse">
                Ochish uchun muhrni bosing
              </p>
              <p className="text-[9px] text-natural-text/50 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                <ChevronDown className="h-3 w-3 animate-bounce" /> Musiqa jo'rligida ochiladi
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* ================= MAIN INVITATION SINGLE-VIEW SCROLL LAYOUT ================= */
          <motion.div
            key="scrollable-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-20 flex min-h-screen w-full flex-col pb-20"
          >
            {/* Header / Sticky Navigation Menu */}
            <header className="sticky top-0 z-40 w-full border-b border-natural-gold-soft/20 bg-white/85 py-3 shadow-xs backdrop-blur-md">
              <div className="mx-auto flex max-w-2xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-base font-bold tracking-widest text-natural-olive">
                    U & M
                  </span>
                </div>

                {/* Elegant Scroll Spy Buttons */}
                <nav className="flex items-center gap-0.5 sm:gap-1.5 overflow-x-auto no-scrollbar max-w-[80vw]">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      id={`nav-btn-${tab.id}`}
                      onClick={() => handleScrollToSection(tab.id)}
                      className={`relative rounded-full px-2.5 sm:px-3.5 py-1 text-[11px] font-semibold tracking-wider transition-all duration-300 whitespace-nowrap ${
                        activeSection === tab.id
                          ? "text-natural-olive bg-natural-olive/10 font-bold"
                          : "text-natural-text/60 hover:text-natural-text"
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </header>

            {/* Ambient Music Player instance */}
            <MusicPlayer shouldPlay={musicShouldPlay} />

            {/* Elegant Fireworks Overlay triggered on reaching end */}
            <FireworksOverlay />

            {/* Single Vertical Scroll Canvas */}
            <main id="main-content" className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12 flex-1 space-y-16 sm:space-y-24">
              
              {/* SECTION 1: HOME */}
              <ScrollSection id="home">
                {/* Auto-playing Hero Carousel Slider */}
                <HeroCarousel />

                {/* Invitation Wordings */}
                <div id="home-wordings" className="rounded-2xl border border-natural-gold-soft/30 bg-white p-6 sm:p-8 text-center space-y-4 shadow-xs">
                  <Heart className="mx-auto h-6 w-6 text-natural-olive/80 animate-pulse" />
                  <h3 className="font-serif text-lg font-bold tracking-wide text-natural-olive">
                    Assalomu alaykum qadrli mehmonlarimiz!
                  </h3>
                  <p className="font-serif text-xs leading-relaxed text-natural-text/80 italic">
                    "Hayot yo'llarimiz birlashgan ushbu baxtli kunda, qalbimiz quvonchini siz aziz yaqinlarimiz bilan ulashishdan g'oyat mamnunmiz. Ilohiy rishtalar ila bog'lanayotgan oilamiz poydevoriga guvoh bo'ling."
                  </p>
                  <p className="font-serif text-xs leading-relaxed text-natural-text/90 font-medium">
                    Sizni nikoh tongi munosabati bilan yoziladigan dasturxonimizga lutfan taklif etamiz.
                  </p>
                </div>
              </ScrollSection>

              {/* SECTION 2: THE COUPLE */}
              <ScrollSection id="couple">
                {/* Poetic Frame */}
                <div id="couple-poem-card" className="border border-natural-gold-soft/30 rounded-3xl bg-white p-6 sm:p-8 text-center relative overflow-hidden shadow-xs">
                  <div className="absolute top-[-30px] right-[-30px] h-24 w-24 rounded-full bg-natural-olive/5 blur-xl pointer-events-none" />
                  <h3 className="font-serif text-2xl font-bold text-natural-olive mb-4">Muhabbat Rishtasi</h3>
                  
                  <div className="space-y-3 font-serif text-xs leading-relaxed text-natural-text/80 italic">
                    <p>"Bir qalb yaraldi-yu, bir dunyo bo‘ldi,</p>
                    <p>Hayotimiz bog'ida muhabbat kuldi.</p>
                    <p>Taqdirning eng go'zal tuhfasi bo'lib,</p>
                    <p>Ikkimizning baxtimiz bir butun bo‘ldi..."</p>
                  </div>
                  
                  <div className="mt-4 flex justify-center items-center gap-2 text-natural-olive/40">
                    <Heart className="h-4 w-4 fill-current animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-natural-gold font-bold">Umar & Malika</span>
                    <Heart className="h-4 w-4 fill-current animate-pulse" />
                  </div>
                </div>

                {/* Presentation Cards of Groom & Bride */}
                <div id="couple-cards" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Groom Umar */}
                  <div className="rounded-2xl border border-natural-gold-soft/30 bg-white p-6 text-center space-y-4 shadow-xs">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-natural-olive/10 border-2 border-natural-olive/20 text-natural-olive">
                      <span className="font-serif text-4xl font-bold">U</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-natural-olive">Umarbek</h4>
                      <p className="text-[10px] uppercase tracking-wider text-natural-text/50 font-bold mt-0.5">Kuyov bola</p>
                    </div>
                    <p className="text-xs text-natural-text/80 italic">
                      "Oila — bu buyuk mas'uliyat va cheksiz sevgidir. Malikaxon bilan baxtli hayot poydevorini qurish eng katta orzuyim."
                    </p>
                  </div>

                  {/* Bride Malika */}
                  <div className="rounded-2xl border border-natural-gold-soft/30 bg-white p-6 text-center space-y-4 shadow-xs">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-natural-olive/10 border-2 border-natural-olive/20 text-natural-olive">
                      <span className="font-serif text-4xl font-bold">M</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-natural-olive">Malikaxon</h4>
                      <p className="text-[10px] uppercase tracking-wider text-natural-text/50 font-bold mt-0.5">Kelin bola</p>
                    </div>
                    <p className="text-xs text-natural-text/80 italic">
                      "Umarbek bilan birga har bir kunga tabassum, mehr va quvonch ulashib, totuv yashash mening eng oliy maqsadimdir."
                    </p>
                  </div>
                </div>

                {/* Elegant Ring visual representation */}
                <div id="couple-rings-banner" className="relative h-48 w-full overflow-hidden rounded-2xl border border-natural-gold-soft/30 shadow-xs">
                  <img
                    id="img-couple-rings"
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600"
                    alt="Wedding Rings"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-natural-olive bg-white/80 px-3 py-1.5 rounded-full border border-natural-gold-soft/20 backdrop-blur-xs font-semibold">
                    <span>Oltin uzuklar ramzi</span>
                  </div>
                </div>
              </ScrollSection>

              {/* SECTION 3: GALLERY */}
              <ScrollSection id="gallery">
                <Gallery />
              </ScrollSection>

              {/* SECTION 4: SCHEDULE */}
              <ScrollSection id="schedule">
                {/* Countdown Timer Widget inside schedule */}
                <div id="home-countdown-card" className="space-y-4 rounded-2xl border border-natural-gold-soft/20 bg-white p-6 shadow-xs">
                  <p className="text-center font-sans text-[11px] font-bold uppercase tracking-widest text-natural-gold">
                    Nikoh tantanasigacha qoldi:
                  </p>
                  <Countdown />
                </div>

                {/* Quick Info Grid */}
                <div id="home-quick-info" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-4 rounded-2xl border border-natural-gold-soft/30 bg-white p-5 shadow-xs">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-natural-olive/10 text-natural-olive shrink-0">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-natural-text/50 font-bold">Tantana kuni</p>
                      <p className="text-xs font-bold text-natural-text mt-0.5">2026-yil, 29-Iyul</p>
                      <p className="text-[10px] text-natural-text/70">Chorshanba kuni</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-natural-gold-soft/30 bg-white p-5 shadow-xs">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-natural-olive/10 text-natural-olive shrink-0">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-natural-text/50 font-bold">Boshlanish vaqti</p>
                      <p className="text-xs font-bold text-natural-text mt-0.5">Ertalab soat 09:00</p>
                      <p className="text-[10px] text-natural-text/70">Barakali tong</p>
                    </div>
                  </div>
                </div>

                <div id="schedule-header" className="text-center pt-4">
                  <h3 id="schedule-title" className="font-serif text-2xl font-bold tracking-wide text-natural-olive">
                    To'y Dasturi
                  </h3>
                  <p id="schedule-subtitle" className="mt-1 text-xs text-natural-text/70">
                    29-Iyul ertalabidagi barcha tantanali marosimlar jadvali
                  </p>
                </div>

                {/* Elegant Timeline */}
                <div id="schedule-timeline" className="relative mt-4 space-y-6 pl-6 border-l-2 border-natural-olive/20 bg-white rounded-3xl p-6 border border-natural-gold-soft/20 shadow-xs">
                  {/* Timeline Item 1 */}
                  <div id="timeline-item-1" className="relative">
                    <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-natural-olive">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-natural-olive/10 border border-natural-olive/20 px-2.5 py-0.5 text-[10px] font-bold text-natural-olive">
                        <Clock className="h-3 w-3" />
                        09:00
                      </span>
                      <h4 className="text-sm font-bold text-natural-text">Kelin-Kuyov Tashrifi va Kutib Olish</h4>
                      <p className="text-xs text-natural-text/80 leading-relaxed">
                        Mehmonlarning Bog'ishamol restorani fayzli zaliga tashrif buyurishi. Kuyov va kelinning tantanali kirib kelishi.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div id="timeline-item-2" className="relative">
                    <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-natural-olive">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-natural-olive/10 border border-natural-olive/20 px-2.5 py-0.5 text-[10px] font-bold text-natural-olive">
                        <Heart className="h-3 w-3" />
                        Keyinroq
                      </span>
                      <h4 className="text-sm font-bold text-natural-text">Nikoh va Uzuk Alishish Marosimi</h4>
                      <p className="text-xs text-natural-text/80 leading-relaxed">
                        Nikohni rasmiylashtirish marosimi va yoshlarning bir-birlariga oltin uzuklar taqish tantanasi.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 3 */}
                  <div id="timeline-item-3" className="relative">
                    <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-natural-olive">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-natural-olive/10 border border-natural-olive/20 px-2.5 py-0.5 text-[10px] font-bold text-natural-olive">
                        <Utensils className="h-3 w-3" />
                        Keyinroq
                      </span>
                      <h4 className="text-sm font-bold text-natural-text">Tantana Boshlanishi va Ziyofat</h4>
                      <p className="text-xs text-natural-text/80 leading-relaxed">
                        Milliy va Yevropa taomlari ulashiladigan fayzli ziyofatning boshlanishi, yaqinlarning tabriklari.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 4 */}
                  <div id="timeline-item-4" className="relative">
                    <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-natural-olive">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-natural-olive/10 border border-natural-olive/20 px-2.5 py-0.5 text-[10px] font-bold text-natural-olive">
                        <Heart className="h-3 w-3 fill-natural-olive/20" />
                        Keyinroq
                      </span>
                      <h4 className="text-sm font-bold text-natural-text">Kelin-Kuyovning Birinchi Valsi</h4>
                      <p className="text-xs text-natural-text/80 leading-relaxed">
                        Yuraklarni sehrlovchi musiqiy vals ijrosi. Romantic chiroqlar va shou elementlari.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 5 */}
                  <div id="timeline-item-5" className="relative">
                    <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-natural-olive">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-natural-olive/10 border border-natural-olive/20 px-2.5 py-0.5 text-[10px] font-bold text-natural-olive">
                        <Gift className="h-3 w-3" />
                        Keyinroq
                      </span>
                      <h4 className="text-sm font-bold text-natural-text">Raqs, Shou-dastur va Sovg'alar</h4>
                      <p className="text-xs text-natural-text/80 leading-relaxed">
                        Mashhur san'atkorlar ishtirokidagi qiziqarli shou-dastur, raqslar hamda esdalik sovg'alar topshirish.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollSection>

              {/* SECTION 5: VENUE */}
              <ScrollSection id="venue">
                <MapSection />
              </ScrollSection>

              {/* SECTION 6: RSVP & WISHES */}
              <ScrollSection id="rsvp">
                <div id="rsvp-header" className="text-center">
                  <h3 id="rsvp-title" className="font-serif text-2xl font-bold tracking-wide text-natural-olive">
                    Tilaklar va Tashrif
                  </h3>
                  <p id="rsvp-subtitle" className="mt-1 text-xs text-natural-text/70">
                    Sizning tilaklaringiz va tashrifingizni tasdiqlashingiz biz uchun muqaddasdir
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  {/* Top RSVP Form */}
                  <RsvpForm onSuccess={handleRsvpSuccess} />

                  {/* Bottom Dynamic Wishes Wall */}
                  <WishesWall refreshTrigger={refreshWishes} />
                </div>
              </ScrollSection>
            </main>

            {/* Subtle Elegant Footer */}
            <footer className="mt-auto border-t border-natural-gold-soft/20 bg-white/50 py-8 text-center text-[10px] text-natural-text/50 font-bold tracking-widest uppercase">
              <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
                <p id="footer-text">
                  UMAR ❤️ MALIKA TO'Y TAKLIFNOMASI — 29 IYUL 2026
                </p>
                <p className="text-[9px] text-natural-gold">
                  BAXTLI BO'LINGLAR!
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
