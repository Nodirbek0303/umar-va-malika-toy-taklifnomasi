/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function Countdown() {
  const targetDate = new Date("2026-07-29T18:00:00+05:00"); // Tashkent time zone (UTC+5)

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isCompleted: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isCompleted) {
    return (
      <div id="countdown-completed-banner" className="text-center">
        <p className="font-serif text-2xl font-semibold tracking-wide text-natural-gold">
          Tantana boshlandi! 🎉
        </p>
        <p className="mt-2 text-xs text-natural-text/70">
          Umar va Malika baxt qasrini qurmoqdalar.
        </p>
      </div>
    );
  }

  const items = [
    { label: "Kun", value: timeLeft.days },
    { label: "Soat", value: timeLeft.hours },
    { label: "Daqiqa", value: timeLeft.minutes },
    { label: "Soniya", value: timeLeft.seconds },
  ];

  return (
    <div id="countdown-grid" className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {items.map((item, index) => (
        <div
          key={item.label}
          id={`countdown-item-${index}`}
          className="flex flex-col items-center rounded-2xl border border-natural-gold-soft/40 bg-white/70 p-3.5 shadow-sm backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          <span
            id={`countdown-value-${index}`}
            className="font-serif text-2xl sm:text-3xl font-bold text-natural-olive"
          >
            {String(item.value).padStart(2, "0")}
          </span>
          <span
            id={`countdown-label-${index}`}
            className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-natural-text/60"
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
