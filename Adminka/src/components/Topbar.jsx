import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmLogout from "./ConfirmLogout";

/**
 * Faqat dizayn uchun yuqori panel (presentational).
 * Mavzu (light / dark / system) tugmalari va profil bloki shu yerda.
 * Bosilganda nima bo'lishini props orqali o'zingiz ulaysiz:
 *   theme      — "light" | "dark" | "system"  (qaysi ikonka faol ko'rinishi)
 *   onTheme    — ikonka bosilganda chaqiriladi
 *   onMenu     — mobil menyu tugmasi
 *   user       — { name, surname, email, role }
 */

/* ---------- Ikonkalar ---------- */
const MenuIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 7h16M4 12h16M4 17h10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M16 16l4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M20 13.4A8 8 0 1110.6 4a6.5 6.5 0 009.4 9.4z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const MonitorIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect
      x="3"
      y="4.5"
      width="18"
      height="12"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M9 20h6M12 16.5V20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const BellIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M18 16v-5a6 6 0 10-12 0v5l-1.5 2.5h15L18 16z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M10 18.5a2 2 0 004 0"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M7 10l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = (props) => (
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

/* ---------- Profil menyusi elementlari ---------- */
const menuItem =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5";

const menuItemDanger =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10";

/* ---------- Mavzu variantlari ---------- */
const themes = [
  { key: "light", label: "Yorug' rejim", icon: SunIcon },
  { key: "dark", label: "Qorong'i rejim", icon: MoonIcon },
  { key: "system", label: "Tizim rejimi", icon: MonitorIcon },
];

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100";

function Topbar({ title = "Bosh sahifa", theme = "light", onTheme, onMenu, user }) {
  // Profil menyusi ochiq/yopiq
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Chiqish tasdiqlash modali
  const [logoutOpen, setLogoutOpen] = useState(false);

  /* Tashqariga bosilganda yoki Escape bosilganda menyuni yopish */
  useEffect(() => {
    if (!menuOpen) return;

    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /* "Hisobdan chiqish" bosilganda tasdiqlash modalini ochish */
  const handleLogoutClick = () => {
    setMenuOpen(false);
    setLogoutOpen(true);
  };

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
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl sm:px-6 dark:border-slate-800 dark:bg-slate-950/80">
      {/* Mobil menyu */}
      <button
        type="button"
        onClick={onMenu}
        aria-label="Menyuni ochish"
        className={`${iconBtn} lg:hidden`}
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {/* Sahifa nomi */}
      <h1 className="hidden text-base font-semibold tracking-tight text-slate-900 sm:block dark:text-white">
        {title}
      </h1>

      {/* Qidiruv */}
      <div className="relative ml-auto w-full max-w-xs lg:ml-6 lg:max-w-sm">
        <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-slate-400">
          <SearchIcon className="h-[18px] w-[18px]" />
        </span>
        <input
          type="search"
          placeholder="Qidirish..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-14 pl-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-900 dark:focus:ring-indigo-400/10"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:block dark:border-slate-700 dark:bg-slate-800">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        {/* ---------- Mavzu almashtirgich ---------- */}
        <div
          role="group"
          aria-label="Mavzuni tanlash"
          className="hidden items-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 p-1 sm:flex dark:border-slate-800 dark:bg-slate-900"
        >
          {themes.map(({ key, label, icon: Icon }) => {
            const active = theme === key;
            return (
              <button
                key={key}
                type="button"
                title={label}
                aria-label={label}
                aria-pressed={active}
                onClick={() => onTheme?.(key)}
                className={`grid h-7 w-8 place-items-center rounded-lg transition ${
                  active
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 dark:bg-white/10 dark:text-indigo-300 dark:ring-white/10"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="h-[17px] w-[17px]" />
              </button>
            );
          })}
        </div>

        {/* Mobil uchun bitta almashtirish tugmasi */}
        <button
          type="button"
          aria-label="Mavzuni almashtirish"
          onClick={() => onTheme?.(theme === "dark" ? "light" : "dark")}
          className={`${iconBtn} sm:hidden`}
        >
          <SunIcon className="h-5 w-5 dark:hidden" />
          <MoonIcon className="hidden h-5 w-5 dark:block" />
        </button>

        {/* Bildirishnomalar */}
        <button type="button" aria-label="Bildirishnomalar" className={`${iconBtn} relative`}>
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950" />
        </button>

        {/* Ajratgich */}
        <span className="mx-0.5 hidden h-6 w-px bg-slate-200 sm:block dark:bg-slate-800" />

        {/* ---------- Profil + ochiladigan menyu ---------- */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 rounded-xl py-1.5 pr-2 pl-1.5 transition hover:bg-slate-100 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:hover:bg-white/5"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={fullName}
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              />
            ) : (
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-semibold text-white">
                {initials || "AD"}
              </span>
            )}

            {/* To'liq ism uchun joy */}
            <span className="hidden text-left leading-tight md:block">
              <span className="block max-w-[10rem] truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                {fullName}
              </span>
              <span className="block max-w-[10rem] truncate text-xs text-slate-400">
                {user?.role ?? user?.email ?? "Administrator"}
              </span>
            </span>

            <ChevronIcon
              className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 md:block ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ---------- Ochiladigan menyu ---------- */}
          {menuOpen && (
            <div
              role="menu"
              aria-label="Profil menyusi"
              className="absolute top-full right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40"
            >
              {/* Foydalanuvchi ma'lumoti */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 dark:border-slate-800">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={fullName}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                  />
                ) : (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-semibold text-white">
                    {initials || "AD"}
                  </span>
                )}
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {fullName}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {user?.email ?? "email@example.com"}
                  </p>
                </div>
              </div>

              {/* Menyu elementlari */}
              <div className="p-1.5">
                <Link
                  to="/profile"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className={menuItem}
                >
                  <UserIcon className="h-[18px] w-[18px] text-slate-400" />
                  Mening profilim
                </Link>
                <Link
                  to="/settings"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className={menuItem}
                >
                  <GearIcon className="h-[18px] w-[18px] text-slate-400" />
                  Sozlamalar
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogoutClick}
                  className={`${menuItemDanger} mt-1 border-t border-slate-100 pt-2.5 dark:border-slate-800`}
                >
                  <LogoutIcon className="h-[18px] w-[18px]" />
                  Hisobdan chiqish
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Chiqishni tasdiqlash modali ---------- */}
        <ConfirmLogout open={logoutOpen} onClose={() => setLogoutOpen(false)} />
      </div>
    </header>
  );
}

export default Topbar;
