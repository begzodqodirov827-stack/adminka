import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

/* =========================================================
 *  API manzillari va yordamchi funksiyalar
 * ========================================================= */

const PRODUCTS_URL = "http://localhost:4000/products";
const USERS_URL = "http://localhost:4000/users";

const fmtPrice = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const avatarGradients = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-violet-500 to-fuchsia-600",
];

const getInitials = (name = "", surname = "") => {
  const n = (name || "").trim().charAt(0).toUpperCase();
  const s = (surname || "").trim().charAt(0).toUpperCase();
  return `${n}${s}` || "U";
};

/* =========================================================
 *  SVG Ikonkalar
 * ========================================================= */

const UsersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="9"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13a4 4 0 0 1 0 7.75"
      stroke="currentColor"
      strokeWidth="1.8"
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
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M4.6 7.6L12 11.6l7.4-4M12 11.6V20.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const WalletIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17" cy="14.5" r="1.2" fill="currentColor" />
  </svg>
);

const ArchiveIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="3" y="4" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const StarIcon = ({ filled, ...props }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
    <path
      d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.4l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.8z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 12h15m0 0l-5-5m5 5l-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparklesIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5l-2.1 2.1M8.6 15.4l-2.1 2.1m12 0l-2.1-2.1M8.6 8.6L6.5 6.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const RefreshIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M20 11a8 8 0 10-2.3 6.3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M20 5v6h-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Spinner = ({ className = "h-4 w-4" }) => (
  <span
    role="status"
    aria-label="Yuklanmoqda"
    className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
  />
);

/* =========================================================
 *  Yordamchi Komponentlar
 * ========================================================= */

/* Statistika kartasi */
function StatCard({ icon: Icon, label, value, hint, badge, gradient, loading }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              {label}
            </p>
            {badge && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {badge}
              </span>
            )}
          </div>
          {loading ? (
            <div className="mt-2.5 h-8 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          ) : (
            <p className="mt-1.5 truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </p>
          )}
          {!loading && hint && (
            <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{hint}</p>
          )}
        </div>
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${gradient}`}
        >
          <Icon className="h-6 w-6" />
        </span>
      </div>
    </div>
  );
}

/* Yulduzli reyting */
function Rating({ value }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} filled={i <= Math.round(value)} className="h-3 w-3" />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
        {Number(value).toFixed(1)}
      </span>
    </div>
  );
}

/* =========================================================
 *  Asosiy Sahifa Komponenti
 * ========================================================= */

function Home() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, usersRes] = await Promise.all([
        axios.get(PRODUCTS_URL),
        axios.get(USERS_URL),
      ]);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
    } catch (err) {
      console.error(err);
      setError("Serverdan ma'lumotlarni yuklab bo'lmadi. JSON-Server ishga tushganligini tekshiring.");
      toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* Hisoblangan statistikalar */
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const newProducts = products.filter((p) => p.isNew).length;
    const lowStock = products.filter((p) => (p.stock || 0) < 10).length;
    const avgPrice = totalProducts ? Math.round(totalValue / totalProducts) : 0;
    const avgRating = totalProducts
      ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / totalProducts).toFixed(1)
      : "0.0";

    // Kategoriyalar statistikasi
    const catMap = {};
    products.forEach((p) => {
      const c = p.category || "Boshqa";
      catMap[c] = (catMap[c] || 0) + 1;
    });
    const categories = Object.entries(catMap)
      .map(([name, count]) => ({
        name,
        count,
        percent: totalProducts ? Math.round((count / totalProducts) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Foydalanuvchi va Mahsulot nisbati
    const ratio = totalUsers > 0 ? (totalProducts / totalUsers).toFixed(1) : totalProducts;

    return {
      totalUsers,
      totalProducts,
      totalValue,
      totalStock,
      newProducts,
      lowStock,
      avgPrice,
      avgRating,
      categories,
      ratio,
    };
  }, [products, users]);

  /* Eng yaxshi baholangan 5 ta mahsulot */
  const topProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviews || 0) - (a.reviews || 0))
        .slice(0, 5),
    [products],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* ==================== Sarlavha Qismi ==================== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              Boshqaruv paneli
            </h2>
            {loading && <Spinner className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {loading ? (
              "Statistika va tizim ma'lumotlari yuklanmoqda..."
            ) : (
              <>
                Tizimda jami{" "}
                <span className="font-semibold text-violet-600 dark:text-violet-400">
                  {stats.totalUsers} nafar foydalanuvchi
                </span>{" "}
                va{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {stats.totalProducts} ta mahsulot
                </span>{" "}
                mavjud.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            title="Yangilash"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:ring-4 focus:ring-slate-100 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshIcon className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Yangilash
          </button>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/25 active:scale-95 dark:shadow-indigo-900/40"
          >
            Barcha mahsulotlar
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ==================== Xatolik Holati ==================== */}
      {error ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-rose-200 bg-rose-50/60 py-16 text-center dark:border-rose-500/20 dark:bg-rose-500/5">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-100 text-rose-500 dark:bg-rose-500/10">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
              <path d="M12 9v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16.8" r="1" fill="currentColor" />
              <path
                d="M10.3 3.9L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">
              Serverga ulanib bo'lmadi
            </p>
            <p className="mt-1 max-w-sm text-xs text-rose-500 dark:text-rose-400/80">{error}</p>
          </div>
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-700 active:scale-95 disabled:opacity-60"
          >
            {loading ? <Spinner className="h-3.5 w-3.5" /> : <RefreshIcon className="h-3.5 w-3.5" />}
            Qayta urinish
          </button>
        </div>
      ) : (
        <>
          {/* ==================== 4 ta Asosiy Stat Kartalari ==================== */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* 1. Foydalanuvchilar */}
            <StatCard
              icon={UsersIcon}
              label="Foydalanuvchilar"
              badge="Ro'yxatdan o'tgan"
              value={loading ? "" : `${stats.totalUsers} nafar`}
              hint="Tizimda faol mijozlar va adminlar"
              gradient="from-violet-500 to-purple-600 shadow-purple-500/25"
              loading={loading}
            />

            {/* 2. Mahsulotlar */}
            <StatCard
              icon={BoxIcon}
              label="Jami Mahsulotlar"
              badge={`${stats.newProducts} ta yangi`}
              value={loading ? "" : `${stats.totalProducts} ta`}
              hint={`${stats.categories.length} xil kategoriyada mavjud`}
              gradient="from-indigo-500 to-indigo-600 shadow-indigo-500/25"
              loading={loading}
            />

            {/* 3. Katalog Qiymati */}
            <StatCard
              icon={WalletIcon}
              label="Katalog Qiymati"
              badge="Umumiy summa"
              value={loading ? "" : fmtPrice(stats.totalValue)}
              hint={`O'rtacha narx: ${fmtPrice(stats.avgPrice)}`}
              gradient="from-emerald-500 to-emerald-600 shadow-emerald-500/25"
              loading={loading}
            />

            {/* 4. Ombor Zaxirasi */}
            <StatCard
              icon={ArchiveIcon}
              label="Ombor Zaxirasi"
              badge={stats.lowStock > 0 ? `${stats.lowStock} ta kam qoldi` : "Yetarli"}
              value={loading ? "" : `${stats.totalStock.toLocaleString()} dona`}
              hint="Barcha tovarlar umumiy qoldig'i"
              gradient="from-amber-500 to-orange-600 shadow-amber-500/25"
              loading={loading}
            />
          </div>

          {/* ==================== Tizim Taqsimoti: Users & Products Maxsus Vidjeti ==================== */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/25 to-purple-50/30 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Chap qism: Foydalanuvchilar qisqacha ma'lumot */}
              <div className="flex flex-1 items-center gap-4">
                <div className="flex -space-x-3 overflow-hidden">
                  {loading ? (
                    <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  ) : (
                    users.slice(0, 4).map((u, idx) => (
                      <div
                        key={u.id || idx}
                        title={`${u.name} ${u.surname || ""}`}
                        className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white ring-2 ring-white dark:ring-slate-900 ${
                          avatarGradients[idx % avatarGradients.length]
                        }`}
                      >
                        {getInitials(u.name, u.surname)}
                      </div>
                    ))
                  )}
                  {!loading && stats.totalUsers > 4 && (
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-800 text-xs font-semibold text-white ring-2 ring-white dark:bg-slate-700 dark:ring-slate-900">
                      +{stats.totalUsers - 4}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Foydalanuvchilar bazasi
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Jami <strong className="text-slate-800 dark:text-slate-200">{stats.totalUsers}</strong> ta
                    foydalanuvchi hisobi ro'yxatga olingan
                  </p>
                </div>
              </div>

              {/* O'rta qism: Nisbat indikatori */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-white/80 px-6 py-3 shadow-xs ring-1 ring-slate-200/80 backdrop-blur-sm sm:flex-row sm:gap-6 dark:bg-slate-800/80 dark:ring-slate-700">
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-medium text-slate-400">Mahsulot / Foydalanuvchi</span>
                  <div className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                    1 a'zoga ~{stats.ratio} ta tovar
                  </div>
                </div>
                <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-slate-700" />
                <div className="mt-2 text-center sm:mt-0 sm:text-left">
                  <span className="text-[11px] font-medium text-slate-400">O'rtacha reyting</span>
                  <div className="flex items-center justify-center gap-1 text-base font-bold text-slate-900 sm:justify-start dark:text-white">
                    <StarIcon filled className="h-4 w-4 text-amber-400" />
                    {stats.avgRating} / 5.0
                  </div>
                </div>
              </div>

              {/* O'ng qism: Yangi mahsulotlar taqdimoti */}
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  <SparklesIcon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {stats.newProducts} ta yangi tovar
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Katalogdagi yangi va ommabop mahsulotlar
                  </p>
                </div>
              </div>
            </div>

            {/* Kategoriyalar bo'yicha tezkor taqsimot chip'lari */}
            {!loading && stats.categories.length > 0 && (
              <div className="mt-5 border-t border-slate-200/70 pt-4 dark:border-slate-800">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Kategoriyalar bo'yicha mahsulotlar taqsimoti:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {stats.categories.length} xil tur
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.categories.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200"
                    >
                      <span>{c.name}</span>
                      <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                        {c.count} ta
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ==================== 2 Ustunli Bo'lim: Foydalanuvchilar va Top Mahsulotlar ==================== */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 1-ustun: Ro'yxatdan o'tgan Foydalanuvchilar */}
            <section className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <UsersIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                      Foydalanuvchilar
                    </h3>
                    <p className="text-xs text-slate-400">Tizimda ro'yxatdan o'tgan a'zolar</p>
                  </div>
                </div>
                <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                  {stats.totalUsers} ta a'zo
                </span>
              </div>

              <div className="flex-1 divide-y divide-slate-100 p-2 dark:divide-slate-800">
                {loading ? (
                  <div className="space-y-3 p-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3.5 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                          <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : users.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    Foydalanuvchilar mavjud emas.
                  </div>
                ) : (
                  users.map((u, idx) => (
                    <div
                      key={u.id || idx}
                      className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-xs font-bold text-white shadow-xs ${
                            avatarGradients[idx % avatarGradients.length]
                          }`}
                        >
                          {getInitials(u.name, u.surname)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {u.name} {u.surname || ""}
                          </p>
                          <p className="truncate text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Faol
                        </span>
                        <p className="mt-1 text-[10px] text-slate-400 font-mono">
                          ID: {String(u.id).slice(0, 6)}...
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* 2-ustun: Eng yaxshi mahsulotlar */}
            <section className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <BoxIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                      Eng yaxshi mahsulotlar
                    </h3>
                    <p className="text-xs text-slate-400">
                      Jami {stats.totalProducts} ta mahsulot ichidan top 5
                    </p>
                  </div>
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Barchasi
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </div>

              <div className="flex-1 divide-y divide-slate-100 p-2 dark:divide-slate-800">
                {loading ? (
                  <div className="space-y-3 p-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-11 w-11 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3.5 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                          <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="h-3.5 w-14 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    ))}
                  </div>
                ) : topProducts.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    Mahsulotlar mavjud emas.
                  </div>
                ) : (
                  topProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="h-11 w-11 shrink-0 rounded-lg bg-slate-100 object-cover dark:bg-slate-800"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {p.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {p.brand} · {p.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {fmtPrice(p.price)}
                        </p>
                        <Rating value={p.rating || 0} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
