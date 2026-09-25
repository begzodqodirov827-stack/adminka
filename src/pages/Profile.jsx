import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../auth/useAuthStore";
import ConfirmLogout from "../components/ConfirmLogout";

/* =========================================================
 *  Ikonkalar
 * ========================================================= */

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

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M4 8l7.1 4.7a2 2 0 002.2 0L20 8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IdCardIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M6.5 16c.6-1.2 1.5-1.8 2.5-1.8s1.9.6 2.5 1.8M15 10h3.5M15 13.5h3.5"
      stroke="currentColor"
      strokeWidth="1.4"
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

/* =========================================================
 *  Yordamchi komponent
 * ========================================================= */

/* Ma'lumot qatori: ikonka + yorliq + qiymat */
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
 *  Profil sahifasi
 * ========================================================= */

function Profile() {
  const user = useAuthStore((s) => s.user);

  // Chiqish tasdiqlash modali
  const [logoutOpen, setLogoutOpen] = useState(false);

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
    <div className="mx-auto max-w-3xl space-y-6">
      {/* =========== Banner + avatar kartasi =========== */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Gradient banner */}
        <div
          className="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #4f46e5 0%, #7c3aed 40%, #a855f7 65%, #d946ef 100%)",
          }}
        />

        {/* Avatar + ism + sessiya holati */}
        <div className="relative flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="-mt-9 grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-2xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-slate-900">
              {initials || "AD"}
            </div>
            <div className="pb-1">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {fullName}
              </h2>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {user?.email ?? "email@example.com"}
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
            Faol sessiya
          </span>
        </div>
      </section>

      {/* =========== Hisob ma'lumotlari =========== */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Hisob ma'lumotlari
          </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <InfoRow icon={UserIcon} label="Ism" value={user?.name ?? "—"} />
          <InfoRow icon={UserIcon} label="Familiya" value={user?.surname ?? "—"} />
          <InfoRow icon={MailIcon} label="Email" value={user?.email ?? "—"} />
          <InfoRow icon={IdCardIcon} label="Foydalanuvchi ID" value={user?.id ?? "—"} />
        </div>
      </section>

      {/* =========== Tezkor havolalar =========== */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Sozlamalar */}
        <Link
          to="/settings"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-600/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400">
            <GearIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Sozlamalar
            </p>
            <p className="text-xs text-slate-400">Profil va tizim sozlamalari</p>
          </div>
        </Link>

        {/* Hisobdan chiqish */}
        <button
          type="button"
          onClick={() => setLogoutOpen(true)}
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-rose-200 hover:shadow-lg hover:shadow-rose-600/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-rose-500/30"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white dark:bg-rose-500/10 dark:text-rose-400">
            <LogoutIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Hisobdan chiqish
            </p>
            <p className="text-xs text-slate-400">Sessiyani yakunlash</p>
          </div>
        </button>
      </div>

      {/* ---------- Chiqishni tasdiqlash modali ---------- */}
      <ConfirmLogout open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
}

export default Profile;
