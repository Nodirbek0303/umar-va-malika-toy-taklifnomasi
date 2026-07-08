/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { Lock, Unlock, Users, CheckCircle, XCircle, Trash2, Download, RefreshCw, X } from "lucide-react";
import { RSVP } from "../types";

interface AdminPanelProps {
  onClose: () => void;
  refreshTrigger: number;
  onDataChange: () => void;
}

export default function AdminPanel({ onClose, refreshTrigger, onDataChange }: AdminPanelProps) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadRsvps();
    }
  }, [isAuthenticated, refreshTrigger]);

  const loadRsvps = () => {
    try {
      const storedRaw = localStorage.getItem("umar_malika_rsvps");
      const stored = storedRaw ? JSON.parse(storedRaw) : [];
      setRsvps(stored);
    } catch (err) {
      console.error("Failed to load RSVPs:", err);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simple wedding passcode
    if (passcode === "2026" || passcode.toLowerCase() === "umar" || passcode.toLowerCase() === "malika") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Noto'g'ri maxfiy kod. Iltimos, qayta urinib ko'ring.");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Haqiqatan ham ushbu javobni o'chirib tashlamoqchimisiz?")) {
      try {
        const updated = rsvps.filter((item) => item.id !== id);
        localStorage.setItem("umar_malika_rsvps", JSON.stringify(updated));
        setRsvps(updated);
        onDataChange();
      } catch (err) {
        console.error("Failed to delete rsvp:", err);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm("DIQQAT! Barcha mehmonlar ro'yxatini to'liq tozalab tashlamoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi!")) {
      try {
        localStorage.removeItem("umar_malika_rsvps");
        setRsvps([]);
        onDataChange();
      } catch (err) {
        console.error("Failed to clear rsvps:", err);
      }
    }
  };

  const handleDownloadCSV = () => {
    if (rsvps.length === 0) {
      alert("Yuklab olish uchun mehmonlar mavjud emas.");
      return;
    }

    try {
      // Create CSV header
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Mehmon Ismi,Tashrifi,Mehmonlar Soni,Tilak,Sana\n";

      // Append rows
      rsvps.forEach((item) => {
        const name = `"${item.name.replace(/"/g, '""')}"`;
        const attendance = item.isComing ? "Ha, boradi" : "Yo'q, bormaydi";
        const count = item.guestCount;
        const wish = `"${item.wish.replace(/"/g, '""').replace(/\n/g, " ")}"`;
        const date = new Date(item.createdAt).toLocaleString();
        
        csvContent += `${name},${attendance},${count},${wish},${date}\n`;
      });

      // Trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Umar_Malika_Toy_Mehmonlar_Royxati.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download CSV:", err);
    }
  };

  // Math stats
  const totalAttendingRsvps = rsvps.filter((item) => item.isComing);
  const totalComingGuestsCount = totalAttendingRsvps.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const totalDeclinedCount = rsvps.filter((item) => !item.isComing).length;

  if (!isAuthenticated) {
    return (
      <div id="admin-auth-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-natural-text/60 p-4 backdrop-blur-md">
        <div id="admin-auth-card" className="relative w-full max-w-sm rounded-2xl border border-natural-gold-soft/40 bg-natural-bg p-6 shadow-2xl text-natural-text">
          <button
            id="btn-admin-auth-close"
            onClick={onClose}
            className="absolute top-4 right-4 text-natural-text/60 hover:text-natural-text"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div id="admin-lock-icon" className="rounded-full bg-natural-gold/15 p-3 text-natural-gold">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-natural-olive">Admin Kirish</h3>
            <p className="mt-1 text-xs text-natural-text/70">
              Umar va Malika uchun maxsus nazorat paneli. Iltimos, maxfiy kodni kiriting (Masalan: 2026).
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-2.5 text-center text-xs text-red-600 font-medium">
                {error}
              </div>
            )}
            <input
              id="input-admin-passcode"
              type="password"
              placeholder="Maxfiy kod"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="block w-full rounded-xl border border-natural-gold-soft/50 bg-white py-3 px-4 text-center text-sm text-natural-text placeholder-natural-text/40 focus:border-natural-olive focus:outline-hidden focus:ring-1 focus:ring-natural-olive"
              autoFocus
            />
            <button
              id="btn-admin-auth-submit"
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-natural-olive py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#4E582E]"
            >
              <Unlock className="h-4 w-4" />
              <span>Kiritish</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-natural-text/70 p-4 overflow-y-auto backdrop-blur-md">
      <div id="admin-dashboard-card" className="w-full max-w-4xl rounded-2xl border border-natural-gold-soft/40 bg-natural-bg p-6 shadow-2xl text-natural-text">
        {/* Header */}
        <div id="admin-dashboard-header" className="flex items-center justify-between border-b border-natural-gold-soft/30 pb-4">
          <div className="flex items-center gap-2">
            <Unlock className="h-5 w-5 text-natural-olive animate-pulse" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-natural-olive">Taklifnoma Boshqaruv Paneli</h2>
          </div>
          <button
            id="btn-admin-dashboard-close"
            onClick={onClose}
            className="rounded-lg bg-natural-gold-soft/25 p-1.5 text-natural-text/70 hover:text-natural-text hover:bg-natural-gold-soft/40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div id="admin-stats-grid" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-natural-gold-soft/30 bg-white p-4 shadow-xs">
            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-natural-text/50 font-semibold">Tashrif buyuruvchilar</p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-blue-600 mt-0.5">{totalComingGuestsCount} kishi</p>
              <p className="text-[9px] text-natural-text/60">({totalAttendingRsvps.length} ta tasdiq)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-natural-gold-soft/30 bg-white p-4 shadow-xs">
            <div className="rounded-full bg-emerald-50 p-3 text-emerald-700">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-natural-text/50 font-semibold">Barcha javoblar</p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5">{rsvps.length} ta</p>
              <p className="text-[9px] text-natural-text/60">umumiy ishtirokchilar</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-natural-gold-soft/30 bg-white p-4 shadow-xs">
            <div className="rounded-full bg-red-50 p-3 text-red-600">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-natural-text/50 font-semibold">Kelolmaydiganlar</p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-red-600 mt-0.5">{totalDeclinedCount} ta</p>
              <p className="text-[9px] text-natural-text/60">uzr so'raganlar</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div id="admin-toolbar" className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-natural-text/80">
            Jami <span className="font-bold text-natural-olive">{rsvps.length} ta</span> foydalanuvchilar tomonidan to'ldirildi.
          </p>
          <div className="flex items-center gap-2">
            <button
              id="btn-admin-refresh"
              onClick={loadRsvps}
              className="flex items-center gap-1 rounded-lg border border-natural-gold-soft/40 bg-white px-3 py-1.5 text-xs text-natural-text/80 hover:bg-natural-bg"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Yangilash</span>
            </button>
            <button
              id="btn-admin-download"
              onClick={handleDownloadCSV}
              className="flex items-center gap-1 rounded-lg bg-natural-olive px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4E582E]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>CSV yuklash</span>
            </button>
            {rsvps.length > 0 && (
              <button
                id="btn-admin-clear-all"
                onClick={handleClearAll}
                className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Tozalash</span>
              </button>
            )}
          </div>
        </div>

        {/* Guest Table */}
        <div id="admin-table-container" className="custom-scrollbar mt-4 max-h-[320px] overflow-auto rounded-xl border border-natural-gold-soft/30 bg-white shadow-xs">
          {rsvps.length === 0 ? (
            <div className="py-12 text-center text-sm text-natural-text/50">
              Hali mehmonlar javob yubormadi.
            </div>
          ) : (
            <table className="w-full text-left text-xs text-natural-text border-collapse">
              <thead className="bg-[#F5F2EA] sticky top-0 text-[10px] uppercase tracking-wider text-natural-text/70 font-bold">
                <tr>
                  <th className="p-3 border-b border-natural-gold-soft/30">T/r</th>
                  <th className="p-3 border-b border-natural-gold-soft/30">Ism-familiya</th>
                  <th className="p-3 border-b border-natural-gold-soft/30 text-center">Tashrif</th>
                  <th className="p-3 border-b border-natural-gold-soft/30 text-center">Soni</th>
                  <th className="p-3 border-b border-natural-gold-soft/30">Tilak/Tabrik</th>
                  <th className="p-3 border-b border-natural-gold-soft/30 text-center">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-natural-gold-soft/15">
                {rsvps.map((item, index) => (
                  <tr key={item.id} className="hover:bg-natural-bg/50">
                    <td className="p-3 font-mono text-natural-text/50">{index + 1}</td>
                    <td className="p-3 font-bold text-natural-text">{item.name}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          item.isComing
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {item.isComing ? "Ha, boradi" : "Yo'q"}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold font-mono text-natural-olive">
                      {item.isComing ? item.guestCount : "-"}
                    </td>
                    <td className="p-3 max-w-[200px] truncate italic text-natural-text/70" title={item.wish}>
                      {item.wish}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-1 text-natural-text/40 hover:bg-red-50 hover:text-red-600"
                        title="O'chirish"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
