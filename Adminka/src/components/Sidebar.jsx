import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Faqat dizayn uchun yon panel (presentational).
 * Hech qanday holat (state) yo'q — ochish/yopish va foydalanuvchi ma'lumoti
 * props orqali tashqaridan beriladi, logikani o'zingiz yozasiz.
 */

/* ---------- Ikonkalar ---------- */
const HomeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 10.5L12 4l8 6.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 9.8V19a1 1 0 001 1h3.5v-4.5h3V20H17a1 1 0 001-1V9.8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BoxIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 3.5l7.5 4v9l-7.5 4-7.5-4v-9l7.5-4z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M4.6 7.6L12 11.6l7.4-4M12 11.6V20.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfileIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M5 19.5c1.2-3 3.9-4.5 7-4.5s5.8 1.5 7 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const GearIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M19.4 14.5a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1.03 1.56V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.56-1.03H3a2 2 0 110-4h.1A1.7 1.7 0 004.65 8.8a1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34h.08A1.7 1.7 0 0010.1 2.9V3a2 2 0 114 0v.1a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87v.08a1.7 1.7 0 001.56 1.03H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1.37z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------- Navigatsiya ro'yxati (pages/ ichidagi sahifalar) ---------- */
const navGroups = [
  {
    label: "Asosiy",
    items: [
      { to: "/", label: "Bosh sahifa", icon: HomeIcon, end: true },
      { to: "/products", label: "Mahsulotlar", icon: BoxIcon, badge: "24" },
    ],
  },
  {
    label: "Tizim",
    items: [
      { to: "/profile", label: "Mening profilim", icon: ProfileIcon },
      { to: "/settings", label: "Sozlamalar", icon: GearIcon },
      { to: "/logout", label: "Chiqish", icon: LogoutIcon, danger: true },
    ],
  },
];

/* ---------- Takrorlanuvchi sinflar ---------- */
const linkBase =
  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition";

const linkIdle =
  "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100";

const linkActive =
  "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20";

const linkDanger =
  "text-slate-600 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300";

function Sidebar({ open = false, onClose, user }) {
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

  return (
    <>
      {/* Mobil uchun qoraytiruvchi fon */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 dark:border-slate-800 dark:bg-slate-950 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ---------- Brend ---------- */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 dark:bg-white/10 dark:ring-1 dark:ring-white/15">
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
                <path
                  d="M12 12l7.5-4.67M12 12v9M12 12L4.5 7.33"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                Adminka
              </div>
              <div className="text-[11px] text-slate-400">Boshqaruv paneli</div>
            </div>
          </div>

          {/* Mobil yopish tugmasi */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Menyuni yopish"
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden dark:hover:bg-white/5 dark:hover:text-slate-200"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* ---------- Navigatsiya ---------- */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6 last:mb-0">
              <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {group.label}
              </p>

              <ul className="space-y-1">
                {group.items.map(({ to, label, icon: Icon, end, badge, danger }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${linkBase} ${
                          danger
                            ? linkDanger
                            : isActive
                              ? linkActive
                              : linkIdle
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Faol holatdagi chap chiziq */}
                          <span
                            className={`absolute top-1/2 -left-3 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600 transition-opacity dark:bg-indigo-400 ${
                              isActive && !danger ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <Icon className="h-[18px] w-[18px] shrink-0" />
                          <span className="flex-1 truncate">{label}</span>

                          {badge ? (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                isActive
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                              }`}
                            >
                              {badge}
                            </span>
                          ) : null}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ---------- Pastki: foydalanuvchi kartasi ---------- */}
        <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50 dark:hover:bg-white/5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-semibold text-white">
              {initials || "AD"}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                {fullName}
              </div>
              <div className="truncate text-xs text-slate-400">
                {user?.email ?? "email@example.com"}
              </div>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
