/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Navigation, Compass, ExternalLink } from "lucide-react";

export default function MapSection() {
  const address = "Samarqand shahri, Bog'ishamol ko'chasi";
  const venueName = "Bog'ishamol Restorani (Samarqand)";

  // Coordinates or text search query for real navigation maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName + " " + address)}`;
  const yandexMapsUrl = `https://yandex.com/maps/?text=${encodeURIComponent(venueName + " " + address)}`;

  return (
    <div id="map-section-wrapper" className="space-y-6">
      <div id="map-header" className="text-center">
        <h3 id="map-title" className="font-serif text-2xl font-bold tracking-wide text-natural-olive">
          Tantana Manzili
        </h3>
        <p id="map-subtitle" className="mt-1 text-xs text-natural-text/70">
          To'y tantanasi bo'lib o'tadigan joy va yo'nalishlar
        </p>
      </div>

      <div
        id="map-card"
        className="overflow-hidden rounded-2xl border border-natural-gold-soft/40 bg-white p-1 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
      >
        {/* Banquet Photo representing Bog'ishamol */}
        <div id="map-photo-container" className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-xl bg-natural-bg">
          <img
            id="img-map-venue"
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200"
            alt="Bog'ishamol Restaurant Banquet Hall"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-85 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-natural-olive/20 text-natural-olive backdrop-blur-md">
              <MapPin className="h-5 w-5 animate-bounce" />
            </span>
            <div>
              <h4 id="map-venue-name" className="font-serif text-base font-bold text-natural-olive drop-shadow-sm">
                {venueName}
              </h4>
              <p id="map-venue-tag" className="text-[10px] text-natural-text/80 font-semibold">
                Kuyov va Kelin navbatchi saroyi
              </p>
            </div>
          </div>
        </div>

        {/* Address and details */}
        <div id="map-details" className="p-5 space-y-4">
          <div id="map-address-box" className="flex gap-3 text-natural-text">
            <Compass className="h-5 w-5 text-natural-olive shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-natural-gold">Manzilimiz:</h5>
              <p id="map-address-text" className="mt-1 text-xs leading-relaxed text-natural-text/90 font-medium">
                {address}
              </p>
            </div>
          </div>

          {/* Schematic map canvas representing Bog'ishamol surroundings */}
          <div id="mock-map-canvas" className="relative h-28 rounded-xl border border-natural-gold-soft/30 bg-natural-bg/50 p-3 overflow-hidden flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
            {/* Simple schematic routes */}
            <div className="absolute h-0.5 w-full bg-natural-gold/15 top-1/2 left-0" />
            <div className="absolute w-0.5 h-full bg-natural-gold/15 left-1/3 top-0" />
            
            {/* Glowing pin representation */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-natural-olive text-white shadow-md shadow-natural-olive/20">
                <MapPin className="h-4 w-4 animate-pulse" />
              </div>
              <span className="mt-1 font-serif text-[10px] font-bold text-natural-olive">BOG'ISHAMOL RESTAURANT</span>
            </div>
          </div>

          {/* Map navigation direct buttons */}
          <div id="map-nav-buttons" className="grid grid-cols-2 gap-3 pt-1">
            <a
              id="link-google-maps"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-natural-gold-soft/50 bg-natural-bg/30 py-3 text-xs font-semibold text-natural-gold transition-all duration-300 hover:border-natural-olive hover:text-natural-olive hover:bg-natural-olive/5"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Google Maps</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>

            <a
              id="link-yandex-maps"
              href={yandexMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-natural-gold-soft/50 bg-natural-bg/30 py-3 text-xs font-semibold text-natural-gold transition-all duration-300 hover:border-natural-olive hover:text-natural-olive hover:bg-natural-olive/5"
            >
              <Navigation className="h-3.5 w-3.5 rotate-45" />
              <span>Yandex Navigator</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
