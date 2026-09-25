import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound404() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-5 py-12 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* ---------- Aurora nurlari (AuthShell bilan bir xil uslub) ---------- */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="animate-aurora absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/25 blur-[110px] dark:bg-indigo-500/30" />
        <div className="animate-aurora absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/20 blur-[120px] [animation-delay:-5s] dark:bg-fuchsia-500/25" />
        <div className="animate-aurora absolute -bottom-28 left-1/4 h-[24rem] w-[24rem] rounded-full bg-sky-400/15 blur-[120px] [animation-delay:-9s] dark:bg-sky-400/20" />
      </div>

      {/* ---------- Nozik to'r naqshi ---------- */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 35%, transparent 78%)",
        }}
      />

      {/* ---------- Markazdagi kontent ---------- */}
      <div className="relative w-full max-w-xl text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 8v4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
          404 — Sahifa topilmadi
        </span>

        {/* Katta 404 raqami */}
        <h1 className="mt-6 bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 bg-clip-text text-[6rem] leading-none font-bold tracking-tight text-transparent select-none sm:text-[8rem] dark:from-indigo-400 dark:via-sky-400 dark:to-fuchsia-400">
          404
        </h1>

        {/* Sarlavha va izoh */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Bu sahifa boshqa joyga ko'chgan bo'lishi mumkin
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Kechirasiz, siz izlagan manzil topilmadi. Manzil noto'g'ri kiritilgan
          bo'lishi yoki sahifa o'chirilgan bo'lishi mumkin.
        </p>

        {/* Tugmalar */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/25 focus:outline-none active:scale-[0.99] sm:w-auto dark:shadow-indigo-900/40"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M4 11l8-7 8 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 10v9h12v-9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Bosh sahifaga qaytish
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:ring-4 focus:ring-slate-300/30 focus:outline-none active:scale-[0.99] sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-600/30"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M14 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Orqaga qaytish
          </button>
        </div>

        {/* Pastki havolalar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link
            to="/products"
            className="text-slate-500 underline-offset-4 transition hover:text-indigo-600 hover:underline dark:text-slate-400 dark:hover:text-indigo-400"
          >
            Mahsulotlar
          </Link>
          <span className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-800" />
          <Link
            to="/settings"
            className="text-slate-500 underline-offset-4 transition hover:text-indigo-600 hover:underline dark:text-slate-400 dark:hover:text-indigo-400"
          >
            Sozlamalar
          </Link>
          <span className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-800" />
          <Link
            to="/login"
            className="text-slate-500 underline-offset-4 transition hover:text-indigo-600 hover:underline dark:text-slate-400 dark:hover:text-indigo-400"
          >
            Kirish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;
