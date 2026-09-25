import React from "react";

/* =========================================================
 *  SKELETON — yuklanish holati uchun komponentlar to'plami
 *
 *  Tarkibi:
 *    - Skeleton        : asosiy primitiv (shimmer effekti bilan)
 *    - SkeletonText    : ko'p qatorli matn
 *    - SkeletonAvatar  : avatar / doira
 *    - SkeletonChips   : xususiyat (spec) chiplari
 *    - SkeletonCard    : mahsulot kartasi (grid ko'rinish)
 *    - SkeletonRow     : mahsulot qatori (list ko'rinish)
 *    - SkeletonStat    : statistika kartasi (Home dagi StatCard uslubida)
 *    - SkeletonUser    : foydalanuvchi qatori (avatar + ism/email)
 *    - SkeletonGrid    : SkeletonCard'lardan to'r
 *    - SkeletonList    : SkeletonRow'lardan ro'yxat
 *
 *  Ishlatilishi:
 *    import Skeleton, { SkeletonCard, SkeletonGrid } from "../components/Skeleton";
 *
 *    {loading ? (
 *      <SkeletonGrid count={8} />
 *    ) : (
 *      <MahsulotlarRoyxati ... />
 *    )}
 * ========================================================= */

/* ---------- Asosiy primitiv ---------- */

/**
 * Barcha skelet elementlari shu primitivdan foydalanadi.
 * Ichida chapdan o'ngga sirg'aluvchi yaltiroq nur (shimmer) bor.
 *
 * @param {string} className - o'lcham va kenglikni tashqaridan berish uchun
 * @param {string} rounded   - burchak yumroqligi (masalan "rounded-full")
 * @param {number} delay     - shimmer to'lqinining kechikishi (ms).
 *                             Ro'yxatlarda kaskad effekt uchun ishlatiladi.
 */
function Skeleton({ className = "", rounded = "rounded-md", delay = 0, style, ...props }) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 ${rounded} ${className}`}
      {...props}
    >
      {/* Yaltiroq nur */}
      <span
        className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10"
        style={delay ? { animationDelay: `-${delay}ms` } : undefined}
      />
    </div>
  );
}

/* ---------- Matn ---------- */

/* Tabiiy ko'rinish uchun qatorlar turli kenglikda bo'ladi */
const LINE_WIDTHS = ["w-full", "w-11/12", "w-5/6", "w-4/5", "w-3/4"];

/**
 * Ko'p qatorli matn uchun skelet. Oxirgi qator biroz qisqaroq chiqadi.
 *
 * @param {number} lines     - qatorlar soni
 * @param {string} lastWidth - oxirgi qator kengligi
 * @param {string} height    - qator balandligi (masalan "h-3" yoki "h-4")
 */
function SkeletonText({
  lines = 3,
  className = "",
  lastWidth = "w-2/3",
  height = "h-3",
  delay = 0,
}) {
  return (
    <div className={`space-y-2 ${className}`} role="presentation">
      {Array.from({ length: Math.max(0, lines) }).map((_, i) => (
        <Skeleton
          key={i}
          rounded="rounded"
          className={`${height} ${
            i === lines - 1 && lines > 1 ? lastWidth : LINE_WIDTHS[i % LINE_WIDTHS.length]
          }`}
          delay={delay + i * 120}
        />
      ))}
    </div>
  );
}

/* ---------- Avatar ---------- */

/**
 * Doira yoki yumaloq to'rtburchak shaklidagi avatar skeleti.
 *
 * @param {string} size    - o'lcham klassi (masalan "h-10 w-10")
 * @param {string} rounded - "rounded-full" (doira) yoki "rounded-xl" (kvadrat)
 */
function SkeletonAvatar({
  size = "h-10 w-10",
  rounded = "rounded-full",
  className = "",
  delay = 0,
}) {
  return <Skeleton rounded={rounded} className={`${size} shrink-0 ${className}`} delay={delay} />;
}

/* ---------- Chip / tag ---------- */

const CHIP_WIDTHS = ["w-16", "w-20", "w-14", "w-24"];

/** Xususiyat chiplari uchun skelet (mahsulot kartasidagi "RAM: 8GB" qatoriga o'xshash) */
function SkeletonChips({ count = 3, className = "", delay = 0 }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`} role="presentation">
      {Array.from({ length: Math.max(0, count) }).map((_, i) => (
        <Skeleton
          key={i}
          rounded="rounded-md"
          className={`h-5 ${CHIP_WIDTHS[i % CHIP_WIDTHS.length]}`}
          delay={delay + i * 100}
        />
      ))}
    </div>
  );
}

/* ---------- Mahsulot kartasi (grid ko'rinish) ---------- */

/** Products sahifasidagi ProductCard'ga mos skelet */
function SkeletonCard({ className = "", delay = 0 }) {
  return (
    <div
      role="status"
      aria-label="Yuklanmoqda"
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Rasm joyi */}
      <Skeleton rounded="rounded-none" className="aspect-[4/3]" delay={delay} />

      {/* Matn qismi */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {/* Brend + nom */}
        <div className="space-y-1.5">
          <Skeleton rounded="rounded" className="h-2.5 w-1/3" delay={delay + 40} />
          <Skeleton rounded="rounded-lg" className="h-4 w-3/4" delay={delay + 80} />
        </div>

        {/* Tavsif */}
        <SkeletonText lines={2} lastWidth="w-5/6" delay={delay + 120} />

        {/* Xususiyatlar */}
        <SkeletonChips count={3} delay={delay + 160} />

        {/* Narx va tugma */}
        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="space-y-1.5">
            <Skeleton rounded="rounded-lg" className="h-5 w-20" delay={delay + 200} />
            <Skeleton rounded="rounded" className="h-3 w-14" delay={delay + 240} />
          </div>
          <Skeleton rounded="rounded-xl" className="h-8 w-20" delay={delay + 200} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Mahsulot qatori (list ko'rinish) ---------- */

/** Products sahifasidagi ProductRow'ga mos skelet */
function SkeletonRow({ className = "", delay = 0 }) {
  return (
    <div
      role="status"
      aria-label="Yuklanmoqda"
      className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Rasm */}
      <Skeleton
        rounded="rounded-xl"
        className="h-36 w-full shrink-0 sm:h-24 sm:w-32"
        delay={delay}
      />

      {/* Ma'lumot */}
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton rounded="rounded" className="h-2.5 w-1/4" delay={delay + 60} />
        <Skeleton rounded="rounded-lg" className="h-4 w-2/3" delay={delay + 100} />
        <div className="flex items-center gap-2 pt-0.5">
          <Skeleton rounded="rounded-full" className="h-3.5 w-24" delay={delay + 140} />
          <Skeleton rounded="rounded-full" className="h-3.5 w-16" delay={delay + 180} />
        </div>
      </div>

      {/* Narx va tugma */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <Skeleton rounded="rounded-lg" className="h-5 w-20" delay={delay + 120} />
        <Skeleton rounded="rounded-xl" className="h-8 w-20" delay={delay + 160} />
      </div>
    </div>
  );
}

/* ---------- Statistika kartasi ---------- */

/** Home sahifasidagi StatCard'ga mos skelet */
function SkeletonStat({ className = "", delay = 0 }) {
  return (
    <div
      role="status"
      aria-label="Yuklanmoqda"
      className={`rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex items-center gap-2">
            <Skeleton rounded="rounded" className="h-2.5 w-24" delay={delay} />
            <Skeleton rounded="rounded-full" className="h-4 w-12" delay={delay + 40} />
          </div>
          <Skeleton rounded="rounded-lg" className="h-8 w-28" delay={delay + 80} />
          <Skeleton rounded="rounded" className="h-3 w-36" delay={delay + 120} />
        </div>
        <Skeleton rounded="rounded-2xl" className="h-12 w-12 shrink-0" delay={delay + 60} />
      </div>
    </div>
  );
}

/* ---------- Foydalanuvchi qatori ---------- */

/** Home sahifasidagi foydalanuvchilar ro'yxati uchun skelet */
function SkeletonUser({ className = "", delay = 0 }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} role="presentation">
      <SkeletonAvatar className="h-10 w-10" delay={delay} />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-1/3" delay={delay + 60} />
        <Skeleton className="h-3 w-1/2" delay={delay + 120} />
      </div>
    </div>
  );
}

/* ---------- Tayyor to'plamlar ---------- */

/**
 * SkeletonCard'lardan to'r (Products sahifasidagi grid bilan bir xil).
 * Har bir kartadagi shimmer to'lqini ketma-ket oqadi.
 *
 * @param {number} count - kartalar soni
 */
function SkeletonGrid({
  count = 8,
  className = "grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
}) {
  return (
    <div className={className} role="status" aria-label="Yuklanmoqda">
      {Array.from({ length: Math.max(0, count) }).map((_, i) => (
        <SkeletonCard key={i} delay={(i % 4) * 150} />
      ))}
    </div>
  );
}

/** SkeletonRow'lardan ro'yxat (list ko'rinish uchun) */
function SkeletonList({ count = 6, className = "space-y-4" }) {
  return (
    <div className={className} role="status" aria-label="Yuklanmoqda">
      {Array.from({ length: Math.max(0, count) }).map((_, i) => (
        <SkeletonRow key={i} delay={(i % 3) * 180} />
      ))}
    </div>
  );
}

/* ---------- Eksportlar ---------- */

export {
  SkeletonText,
  SkeletonAvatar,
  SkeletonChips,
  SkeletonCard,
  SkeletonRow,
  SkeletonStat,
  SkeletonUser,
  SkeletonGrid,
  SkeletonList,
};

export default Skeleton;