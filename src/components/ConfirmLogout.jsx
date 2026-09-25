import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../auth/useAuthStore";

/* =========================================================
 *  Ikonkalar
 * ========================================================= */

const LogoutIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M15 8V6.5a2 2 0 00-2-2H6.5a2 2 0 00-2 2v11a2 2 0 002 2H13a2 2 0 002-2V16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M10.5 12h9m0 0l-2.8-2.8M19.5 12l-2.8 2.8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* =========================================================
 *  Chiqishni tasdiqlash modali
 *
 *  Props:
 *    open        — modal ochiq/yopiq
 *    onClose     — "Bekor qilish" va fon bosilganda chaqiriladi
 *  ========================================================= */

function ConfirmLogout({ open, onClose }) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const fullName =
    user?.name || user?.surname
      ? `${user?.name ?? ""} ${user?.surname ?? ""}`.trim()
      : "Foydalanuvchi";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  /* Escape bosilganda yopish + body scrollni bloklash */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  /* Sessiyani yakunlash va login sahifasiga o'tish */
  const handleConfirm = () => {
    logout();
    onClose?.();
    navigate("/login", { replace: true });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
    >
      {/* Fon: qoraytirish + blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

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
          <LogoutIcon className="h-7 w-7" />
        </span>

        {/* Sarlavha va izoh */}
        <h2
          id="logout-title"
          className="mt-5 text-xl font-bold tracking-tight text-white"
        >
          Hisobdan chiqasizmi?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Sessiya tugatiladi va siz kirish sahifasiga qaytasiz.
          <br />
          Qaytadan kirish uchun email va parolingiz kerak bo'ladi.
        </p>

        {/* Foydalanuvchi kartasi */}
        <div className="mt-5 flex items-center gap-3.5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
            {initials || "AD"}
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold text-white">{fullName}</p>
            <p className="truncate text-xs text-slate-400">
              {user?.email ?? "email@example.com"}
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
            onClick={handleConfirm}
            className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-700 focus:ring-4 focus:ring-rose-500/25 focus:outline-none active:scale-95"
          >
            <LogoutIcon className="h-4 w-4" />
            Ha, chiqaman
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLogout;
