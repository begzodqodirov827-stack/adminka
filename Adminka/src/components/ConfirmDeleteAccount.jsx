import { useEffect, useRef, useState } from "react";

/* =========================================================
 *  Ikonkalar
 * ========================================================= */

const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m3 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const AlertIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

/* =========================================================
 *  Hisobni o'chirishni tasdiqlash modali
 *
 *  Barcha logika (deleteUser, getData) Settings.jsx'da —
 *  bu komponent faqat TASDIQLASH oynasi.
 *  Foydalanuvchi "O'CHIRISH" so'zini yozishi shart!
 *
 *  Props:
 *    open      — modal ochiq/yopiq (Settings'dagi showModal)
 *    onClose   — "Bekor qilish" bosilganda chaqiriladi
 *    onConfirm — "Ha, o'chirish" bosilganda chaqiriladi
 *                (Settings'dagi deleteUser ishlaydi)
 *    userData  — serverdan kelgan foydalanuvchi ma'lumoti
 *  ========================================================= */

const CONFIRM_WORD = "O'CHIRISH";

function ConfirmDeleteAccount({ open, onClose, onConfirm, userData }) {
  const [confirmText, setConfirmText] = useState("");
  const inputRef = useRef(null);

  /* Tasdiqlash so'zi to'g'ri yozildimi? */
  const isConfirmed = confirmText.trim().toUpperCase() === CONFIRM_WORD;

  /* Modal ochilganda: inputni tozalash + fokus + scroll bloklash */
  useEffect(() => {
    if (!open) return;

    setConfirmText("");

    const t = setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape bosilganda yopish */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const fullName =
    `${userData?.name ?? ""} ${userData?.surname ?? ""}`.trim() || "Foydalanuvchi";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
    >
      {/* Fon: qoraytirish + blur */}
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

      {/* Karta */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-7 text-slate-100 shadow-2xl shadow-black/50 dark:bg-slate-900">
        {/* Yopish tugmasi */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-5 right-5 grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
        >
          <CloseIcon className="h-4.5 w-4.5" />
        </button>

        {/* Ikonka */}
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20">
          <TrashIcon className="h-7 w-7" />
        </span>

        {/* Sarlavha va izoh */}
        <h2 id="delete-title" className="mt-5 text-xl font-bold tracking-tight text-white">
          Hisobni o'chirishni xohlaysizmi?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Hisobingiz <span className="font-semibold text-slate-200">butunlay</span> o'chiriladi va
          bu amalni <span className="font-semibold text-rose-300">qaytarib bo'lmaydi</span>.
        </p>

        {/* Foydalanuvchi kartasi */}
        <div className="mt-5 flex items-center gap-3.5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
            {(fullName[0] ?? "F").toUpperCase()}
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold text-white">{fullName}</p>
            <p className="truncate text-xs text-slate-400">
              {userData?.email ?? "email@example.com"}
            </p>
          </div>
        </div>

        {/* Tasdiqlash matni kiritish */}
        <div className="mt-5">
          <label htmlFor="confirm-delete" className="mb-2 block text-xs leading-relaxed text-slate-400">
            Tasdiqlash uchun{" "}
            <span className="rounded-md bg-rose-500/10 px-1.5 py-0.5 font-bold text-rose-300 ring-1 ring-rose-500/20">
              O'CHIRISH
            </span>{" "}
            so'zini yozing:
          </label>
          <input
            ref={inputRef}
            id="confirm-delete"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="O'CHIRISH"
            autoComplete="off"
            spellCheck="false"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-rose-500/50 focus:bg-white/10 focus:ring-4 focus:ring-rose-500/10"
          />

          {/* Ogohlantirish */}
          <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-rose-500/5 p-3.5 ring-1 ring-rose-500/15">
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <p className="text-xs leading-relaxed text-rose-200/80">
              Barcha profil ma'lumotlaringiz o'chiriladi va bu hisobga qaytish mumkin bo'lmaydi.
            </p>
          </div>
        </div>

        {/* Tugmalar */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 ring-1 ring-white/10 transition hover:bg-white/10 focus:ring-4 focus:ring-white/10 focus:outline-none active:scale-95"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.()}
            disabled={!isConfirmed}
            className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 transition enabled:hover:bg-rose-700 focus:ring-4 focus:ring-rose-500/25 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <TrashIcon className="h-4 w-4" />
            Ha, o'chirish
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteAccount;
