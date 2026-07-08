/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Heart, MessageSquareQuote, Calendar } from "lucide-react";
import { RSVP } from "../types";

// Pre-seeded heartwarming congratulations from parents, family, and friends
const PRESEEDED_WISHES: RSVP[] = [
  {
    id: "pre-1",
    name: "Ota-onalarimiz nomidan",
    isComing: true,
    guestCount: 2,
    wish: "Aziz farzandlarimiz Umarbek va Malikaxon! Baxt qasringiz mustahkam bo'lsin. Ilohim, bir umr qo'sha-qaringlar, xonadoningizdan fayz va baraka, kulgu arimasin. Biz sizlar bilan faxrlanamiz! ❤️",
    createdAt: new Date("2026-07-01T10:00:00Z").toISOString(),
  },
  {
    id: "pre-2",
    name: "Sardor va Dildora (Do'stlar)",
    isComing: true,
    guestCount: 2,
    wish: "Umar og'ayni, to'yingiz bilan chin qalbimdan tabriklayman! Dunyodagi eng go'zal kelin-kuyov sizlar bo'lasizlar deb o'ylayman. Baxtingizga ko'z tegmasin. To'yda mazza qilib raqsga tushamiz! 🥳🎉",
    createdAt: new Date("2026-07-02T14:30:00Z").toISOString(),
  },
  {
    id: "pre-3",
    name: "Nozima (Malikaning dugonasi)",
    isComing: true,
    guestCount: 1,
    wish: "Malika jonim, baxtingdan judayam xursandman! Umarbek bilan baxtli, saodatli va go'zal hayot kechirishingizni tilayman. Har doim bir-biringizni qo'llab-quvvatlab, sevimli bo'linglar! 🌸✨",
    createdAt: new Date("2026-07-03T09:15:00Z").toISOString(),
  },
  {
    id: "pre-4",
    name: "Amakilar oilasidan",
    isComing: true,
    guestCount: 4,
    wish: "Yangi oila a'zolari! To'y muborak bo'lsin. Baxtingiz asriy, sevgingiz abadiy bo'lsin. Ilohim, kelajakda shirin-shirin farzandlarning ota-onasi bo'lish nasib qilsin. Omin! 🤲🌹",
    createdAt: new Date("2026-07-04T18:45:00Z").toISOString(),
  }
];

interface WishesWallProps {
  refreshTrigger: number;
}

export default function WishesWall({ refreshTrigger }: WishesWallProps) {
  const [wishes, setWishes] = useState<RSVP[]>([]);

  useEffect(() => {
    const fetchWishes = () => {
      try {
        const storedRaw = localStorage.getItem("umar_malika_rsvps");
        const stored: RSVP[] = storedRaw ? JSON.parse(storedRaw) : [];
        
        // Merge preloaded wishes with user submitted ones, sorted by date (newest first)
        const allWishes = [...stored, ...PRESEEDED_WISHES].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setWishes(allWishes);
      } catch (err) {
        console.error("Failed to load wishes:", err);
        setWishes(PRESEEDED_WISHES);
      }
    };

    fetchWishes();
  }, [refreshTrigger]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      // Beautiful formatting in Uzbek
      const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
      ];
      return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    } catch {
      return "Yaqinda";
    }
  };

  return (
    <div id="wishes-wall-container" className="space-y-6">
      <div id="wishes-header" className="text-center">
        <h3 id="wishes-title" className="font-serif text-2xl font-bold tracking-wide text-natural-olive">
          Mehmonlar Tilaklari
        </h3>
        <p id="wishes-subtitle" className="mt-1 text-xs text-natural-text/70">
          Yaqinlarimiz va do'stlarimiz tomonidan bildirilgan eng ezgu tilaklar
        </p>
      </div>

      <div
        id="wishes-scroll-box"
        className="custom-scrollbar max-h-[480px] overflow-y-auto pr-2 space-y-4"
      >
        {wishes.length === 0 ? (
          <div id="no-wishes-placeholder" className="text-center py-8 text-sm text-natural-text/50">
            Hali tilaklar yozilmagan. Birinchi bo'ling!
          </div>
        ) : (
          wishes.map((item, index) => (
            <div
              key={item.id}
              id={`wish-card-${index}`}
              className="relative rounded-2xl border border-natural-gold-soft/30 bg-white p-5 shadow-sm transition-all duration-300 hover:border-natural-gold/50 hover:bg-natural-bg/30 hover:shadow-md"
            >
              <div className="absolute top-4 right-4 text-natural-gold-soft/35">
                <MessageSquareQuote className="h-8 w-8" />
              </div>

              <div className="flex items-center gap-2">
                <div id={`wish-avatar-${index}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-natural-olive/10 text-natural-olive">
                  <Heart id={`wish-heart-${index}`} className="h-4 w-4 fill-natural-olive/10" />
                </div>
                <div>
                  <h4 id={`wish-name-${index}`} className="text-sm font-bold text-natural-text">
                    {item.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    <span
                      id={`wish-status-${index}`}
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-semibold ${
                        item.isComing
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {item.isComing ? `Tashrif buyuradi (${item.guestCount || 1} kishi)` : "Bora olmaydi"}
                    </span>
                    <span id={`wish-date-${index}`} className="flex items-center gap-1 text-[10px] text-natural-text/50">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <p id={`wish-text-${index}`} className="mt-4 text-xs leading-relaxed text-natural-text/80 italic whitespace-pre-line">
                "{item.wish}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
