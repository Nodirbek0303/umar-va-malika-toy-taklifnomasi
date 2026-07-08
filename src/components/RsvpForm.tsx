/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, User, Users, MessageSquare } from "lucide-react";
import { RSVP } from "../types";

interface RsvpFormProps {
  onSuccess: () => void;
}

export default function RsvpForm({ onSuccess }: RsvpFormProps) {
  const [name, setName] = useState("");
  const [isComing, setIsComing] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [wish, setWish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Iltimos, ismingizni kiriting.");
      return;
    }
    if (isComing === null) {
      setError("Iltimos, tashrif buyurishingizni belgilang.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRsvp: RSVP = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        isComing,
        guestCount: isComing ? guestCount : 0,
        wish: wish.trim() || "Baxtli bo'linglar!",
        createdAt: new Date().toISOString(),
      };

      try {
        const existingRaw = localStorage.getItem("umar_malika_rsvps");
        const existing: RSVP[] = existingRaw ? JSON.parse(existingRaw) : [];
        existing.push(newRsvp);
        localStorage.setItem("umar_malika_rsvps", JSON.stringify(existing));

        setIsSuccess(true);
        setName("");
        setIsComing(null);
        setGuestCount(1);
        setWish("");
        onSuccess();
      } catch (err) {
        console.error("Local storage error:", err);
        setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div
        id="rsvp-success-card"
        className="flex flex-col items-center justify-center rounded-2xl border border-natural-gold-soft/40 bg-white p-8 text-center shadow-xl"
      >
        <div id="rsvp-success-icon-container" className="rounded-full bg-natural-olive/10 p-4 text-natural-olive animate-bounce">
          <CheckCircle2 id="rsvp-success-icon" className="h-12 w-12" />
        </div>
        <h3 id="rsvp-success-title" className="mt-4 font-serif text-2xl font-bold text-natural-olive">
          Katta rahmat!
        </h3>
        <p id="rsvp-success-message" className="mt-2 text-sm text-natural-text/80">
          Javobingiz muvaffaqiyatli qabul qilindi. Sizni to'yimizda ko'rishdan bag'oyat mamnunmiz!
        </p>
        <button
          id="btn-rsvp-new"
          onClick={() => setIsSuccess(false)}
          className="mt-6 rounded-lg border border-natural-gold/50 px-5 py-2 text-xs font-semibold text-natural-gold transition-colors hover:bg-natural-gold hover:text-white"
        >
          Yana bir javob yozish
        </button>
      </div>
    );
  }

  return (
    <form
      id="rsvp-form"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-natural-gold-soft/40 bg-white p-6 md:p-8 shadow-md"
    >
      <h3 id="rsvp-form-title" className="text-center font-serif text-xl sm:text-2xl font-bold tracking-wide text-natural-olive">
        Tashrifingizni Tasdiqlang
      </h3>
      <p id="rsvp-form-subtitle" className="mt-1 text-center text-xs text-natural-text/70">
        Biz uchun har bir mehmonning tashrifi qadrli. Iltimos, quyidagi formani to'ldiring.
      </p>

      {error && (
        <div id="rsvp-error-box" className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-center text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      <div id="rsvp-inputs-container" className="mt-6 space-y-5">
        {/* Name input */}
        <div id="input-group-name">
          <label id="label-name" className="block text-xs font-semibold uppercase tracking-wider text-natural-text/80">
            Ism va Familiyangiz
          </label>
          <div className="relative mt-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-natural-gold/80">
              <User className="h-4 w-4" />
            </span>
            <input
              id="input-name"
              type="text"
              required
              placeholder="Masalan: Umarbek Shokirov"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-xl border border-natural-gold-soft/50 bg-natural-bg/50 py-3 pl-10 pr-4 text-sm text-natural-text placeholder-natural-text/40 focus:border-natural-olive focus:outline-hidden focus:ring-1 focus:ring-natural-olive"
            />
          </div>
        </div>

        {/* Attendance choice */}
        <div id="input-group-attendance">
          <label id="label-attendance" className="block text-xs font-semibold uppercase tracking-wider text-natural-text/80">
            Tashrif buyurasizmi?
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <button
              id="btn-attendance-yes"
              type="button"
              onClick={() => setIsComing(true)}
              className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all duration-300 ${
                isComing === true
                  ? "border-natural-olive bg-natural-olive/10 text-natural-olive"
                  : "border-natural-gold-soft/40 bg-natural-bg/40 text-natural-text/70 hover:border-natural-gold-soft"
              }`}
            >
              <span className="text-sm font-semibold">Ha, boraman!</span>
              <span className="mt-1 text-[10px] opacity-70">Sizni ko'rishdan xursandmiz</span>
            </button>
            <button
              id="btn-attendance-no"
              type="button"
              onClick={() => setIsComing(false)}
              className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all duration-300 ${
                isComing === false
                  ? "border-natural-olive bg-natural-olive/10 text-natural-olive"
                  : "border-natural-gold-soft/40 bg-natural-bg/40 text-natural-text/70 hover:border-natural-gold-soft"
              }`}
            >
              <span className="text-sm font-semibold">Afsuski, yo'q</span>
              <span className="mt-1 text-[10px] opacity-70">Uzrli sabablarga ko'ra</span>
            </button>
          </div>
        </div>

        {/* Guest count (conditional) */}
        {isComing === true && (
          <div id="input-group-guest-count" className="animate-fade-in">
            <label id="label-guest-count" className="block text-xs font-semibold uppercase tracking-wider text-natural-text/80">
              Siz bilan necha kishi tashrif buyuradi?
            </label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-natural-gold/80">
                <Users className="h-4 w-4" />
              </span>
              <select
                id="select-guest-count"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="block w-full rounded-xl border border-natural-gold-soft/50 bg-natural-bg/50 py-3 pl-10 pr-4 text-sm text-natural-text focus:border-natural-olive focus:outline-hidden focus:ring-1 focus:ring-natural-olive"
              >
                <option value={1}>1 kishi (Faqat o'zim)</option>
                <option value={2}>2 kishi</option>
                <option value={3}>3 kishi</option>
                <option value={4}>4 kishi</option>
                <option value={5}>5 kishi</option>
              </select>
            </div>
          </div>
        )}

        {/* Congratulatory wishes */}
        <div id="input-group-wish">
          <label id="label-wish" className="block text-xs font-semibold uppercase tracking-wider text-natural-text/80">
            Yoshlarga samimiy tabrik va tilaklar
          </label>
          <div className="relative mt-2">
            <span className="absolute top-3 left-3 text-natural-gold/80">
              <MessageSquare className="h-4 w-4" />
            </span>
            <textarea
              id="textarea-wish"
              rows={3}
              placeholder="Umar va Malika, baxtingizga ko'z tegmasin! Bir umr qo'sha qaring..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              className="block w-full rounded-xl border border-natural-gold-soft/50 bg-natural-bg/50 py-3 pl-10 pr-4 text-sm text-natural-text placeholder-natural-text/40 focus:border-natural-olive focus:outline-hidden focus:ring-1 focus:ring-natural-olive"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="btn-rsvp-submit"
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-natural-olive py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#4E582E] active:scale-[0.99] disabled:opacity-50"
        >
          {isSubmitting ? (
            <span id="rsvp-submitting-spinner" className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Send id="rsvp-submit-icon" className="h-4 w-4" />
              <span>Javobni Yuborish</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
