import React from "react";

/**
 * Faqat dizayn uchun "qobiq" (presentational).
 * Chap tomonda brend paneli, o'ng tomonda forma joylashadi.
 * Hech qanday holat (state) yoki hodisa (event) yo'q — logikani o'zingiz yozasiz.
 */
function AuthShell({ badge, title, subtitle, children }) {
  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-900 lg:grid lg:h-screen lg:min-h-0 lg:grid-cols-[1.05fr_1fr] lg:overflow-hidden dark:bg-slate-950 dark:text-slate-100">
      {/* ---------- Chap: brend paneli ---------- */}
      <aside className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-10 lg:p-10 xl:p-14">
        {/* Aurora nurlari */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-aurora absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/40 blur-[110px]" />
          <div className="animate-aurora absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/30 blur-[120px] [animation-delay:-5s]" />
          <div className="animate-aurora absolute -bottom-28 left-1/4 h-[24rem] w-[24rem] rounded-full bg-sky-400/25 blur-[120px] [animation-delay:-9s]" />
        </div>

        {/* Nozik to'r naqshi */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 50% 40%, black 35%, transparent 78%)",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-white"
              aria-hidden="true"
            >
              <path
                d="M12 3l7.5 4.33v8.66L12 21l-7.5-5.01V7.33L12 3z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M12 12l7.5-4.67M12 12v9M12 12L4.5 7.33"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Adminka
          </span>
        </div>

        {/* Sarlavha */}
        <div className="relative max-w-lg">
          <h1 className="text-4xl leading-[1.15] font-bold tracking-tight text-white xl:text-[2.75rem]">
            Biznesingizni bitta
            <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-fuchsia-300 bg-clip-text text-transparent">
              {" "}
              boshqaruv paneli
            </span>{" "}
            orqali nazorat qiling.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-300/90">
            Mahsulotlar, buyurtmalar va foydalanuvchilar — barchasi bir joyda.
            Tezkor, xavfsiz va zamonaviy interfeys.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              "Real vaqtda statistika va hisobotlar",
              "Rollarga asoslangan kirish nazorati",
              "Qorong'i rejim va mobil moslashuv",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-emerald-300"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-sm text-slate-200/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pastki statistika */}
        <div className="relative flex items-center gap-8 border-t border-white/10 pt-6">
          {[
            ["12k+", "Faol foydalanuvchi"],
            ["99.9%", "Ishlash barqarorligi"],
            ["24/7", "Qo'llab-quvvatlash"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-xl font-semibold text-white">{value}</div>
              <div className="mt-0.5 text-xs text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* ---------- O'ng: forma ---------- */}
      <main className="lg:h-full lg:min-h-0 lg:overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:min-h-full lg:py-12">
          <div className="w-full max-w-[26rem]">
            {/* Mobil logo */}
            <div className="mb-8 flex items-center gap-2.5 lg:hidden">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 dark:bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3l7.5 4.33v8.66L12 21l-7.5-5.01V7.33L12 3z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-semibold tracking-tight">Adminka</span>
            </div>

            {badge ? (
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20">
                {badge}
              </span>
            ) : null}

            <h2 className="mt-4 text-[1.75rem] font-bold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuthShell;
