/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Camera, Heart, ImageIcon } from "lucide-react";

export default function Gallery() {
  return (
    <div id="gallery-section-container" className="space-y-8 animate-fade-in">
      <div id="gallery-header" className="text-center">
        <h3 id="gallery-title" className="font-serif text-2xl font-bold tracking-wide text-natural-olive">
          Bizning Shirin Damlarimiz
        </h3>
        <p id="gallery-subtitle" className="mt-1 text-xs text-natural-text/70">
          Kuyov va kelinning eng go'zal, samimiy va unutilmas baxtli lahzalari
        </p>
      </div>

      <div
        id="gallery-placeholder"
        className="relative overflow-hidden rounded-3xl border border-natural-gold-soft/35 bg-white p-8 sm:p-12 text-center shadow-sm"
      >
        <div className="absolute top-[-30px] right-[-30px] h-32 w-32 rounded-full bg-natural-olive/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-20px] left-[-20px] h-24 w-24 rounded-full bg-natural-gold/10 blur-xl pointer-events-none" />

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-natural-olive/10 border-2 border-natural-olive/20">
          <Camera className="h-9 w-9 text-natural-olive/80" />
        </div>

        <div className="relative mt-6 space-y-3 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-natural-gold">
            <ImageIcon className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Tez orada
            </span>
            <ImageIcon className="h-4 w-4" />
          </div>

          <p className="font-serif text-base sm:text-lg font-semibold text-natural-olive leading-relaxed">
            Kuyov va kelinning baxtli lahzalari aks etgan haqiqiy fotosuratlar tez orada taqdim etiladi
          </p>

          <p className="text-xs text-natural-text/65 leading-relaxed">
            Umar va Malikaning eng samimiy va quvonchli suratlari shu yerda joylashtiriladi. Iltimos, biroz kuting.
          </p>
        </div>

        <div className="relative mt-8 flex items-center justify-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-natural-olive/10 border border-natural-olive/20">
            <span className="font-serif text-xl font-bold text-natural-olive">U</span>
          </div>
          <Heart className="h-5 w-5 text-natural-gold fill-natural-gold/20 animate-pulse" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-natural-olive/10 border border-natural-olive/20">
            <span className="font-serif text-xl font-bold text-natural-olive">M</span>
          </div>
        </div>
      </div>

      <div
        id="gallery-note"
        className="mx-auto max-w-md rounded-2xl border border-dashed border-natural-gold-soft/50 bg-white/40 p-4 text-center"
      >
        <p className="font-serif text-xs italic text-natural-text/70 flex items-center justify-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-natural-gold fill-natural-gold/20" />
          "Har bir lahza sen bilan go'zal, har bir kun sen bilan bayram..."
        </p>
      </div>
    </div>
  );
}
