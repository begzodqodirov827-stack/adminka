import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SkeletonGrid } from "../components/Skeleton";


const API_URL = "http://localhost:4000/products";

const fmtPrice = (value) =>
  `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/* Mahsulotda mavjud bo'lishi mumkin bo'lgan xususiyatlar (data.json strukturasiga ko'ra) */
const specKeys = [
  ["storage", "Xotira"],
  ["ram", "RAM"],
  ["screen", "Ekran"],
  ["battery", "Batareya"],
  ["processor", "Protsessor"],
  ["material", "Material"],
];

const getSpecs = (p) =>
  specKeys
    .map(([key, label]) => [label, p[key]])
    .filter(([, value]) => value !== undefined && value !== null)
    .slice(0, 3);

const stockMeta = (stock) => {
  if (stock >= 20)
    return {
      label: "Omborda bor",
      cls: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    };
  if (stock >= 10)
    return {
      label: "Kam qoldi",
      cls: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
    };
  return {
    label: "Oxirgi mahsulotlar",
    cls: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
  };
};

/* =========================================================
 *  Ikonkalar
 * ========================================================= */

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

const GridIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect
      x="4"
      y="4"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <rect
      x="13"
      y="4"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <rect
      x="4"
      y="13"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <rect
      x="13"
      y="13"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const ListIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* Doiraviy spiner */
const Spinner = ({ className = "h-4 w-4" }) => (
  <span
    role="status"
    aria-label="Yuklanmoqda"
    className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
  />
);

/* =========================================================
 *  Kichik komponentlar
 * ========================================================= */

/* Yulduzcha reyting */
function Rating({ value, reviews }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            filled={i <= Math.round(value)}
            className="h-3.5 w-3.5"
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
        {value.toFixed(1)}
      </span>
      <span className="text-xs text-slate-400">({reviews})</span>
    </div>
  );
}

/* Mahsulot kartasi (grid ko'rinish) */
function ProductCard({ product }) {
  const specs = getSpecs(product);
  const stock = stockMeta(product.stock);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-600/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30">
      {/* ---------- Rasm ---------- */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-800/50">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Chegirmalar */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.discount > 0 && (
            <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg shadow-rose-500/30">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg shadow-indigo-600/30">
              Yangi
            </span>
          )}
          {product.isPopular && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-amber-600 shadow-sm ring-1 ring-amber-200 backdrop-blur dark:bg-slate-900/90 dark:ring-amber-400/30">
              Top
            </span>
          )}
        </div>

        {/* Reyting */}
        <div className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-1 shadow-sm ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>
      </div>

      {/* ---------- Matn qismi ---------- */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            {product.brand} · {product.category}
          </p>
          <h3
            className="mt-1 truncate text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        {/* Xususiyatlar */}
        {specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {specs.map(([label, value]) => (
              <span
                key={label}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
              >
                {label}: {value}
              </span>
            ))}
          </div>
        )}

        {/* Ombor holati */}
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${stock.cls}`}
          >
            {stock.label}
          </span>
          <span className="text-[11px] text-slate-400">
            {product.stock} dona
          </span>
        </div>

        {/* Narx va tugma */}
        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <div>
            <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {fmtPrice(product.price)}
            </div>
            {product.oldPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {fmtPrice(product.oldPrice)}
              </div>
            )}
          </div>
          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/25 focus:outline-none active:scale-95 dark:shadow-indigo-900/40"
          >
            Savatga
          </button>
        </div>
      </div>
    </article>
  );
}

/* Mahsulot qatori (list ko'rinish) */
function ProductRow({ product }) {
  const specs = getSpecs(product);
  const stock = stockMeta(product.stock);

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-600/5 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30">
      {/* Rasm */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 sm:h-24 sm:w-32 dark:from-slate-800 dark:to-slate-800/50">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Ma'lumot */}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
          {product.brand} · {product.category}
        </p>
        <h3 className="mt-0.5 truncate text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
          {product.title}
          {product.isNew && (
            <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 align-middle text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20">
              Yangi
            </span>
          )}
        </h3>

        <div className="mt-1.5">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        {specs.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {specs.map(([label, value]) => (
              <span
                key={label}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
              >
                {label}: {value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Narx va holat */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <div className="text-right">
          <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {fmtPrice(product.price)}
          </div>
          {product.oldPrice > product.price && (
            <div className="text-xs text-slate-400 line-through">
              {fmtPrice(product.oldPrice)}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`hidden rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 sm:inline ${stock.cls}`}
          >
            {stock.label}
          </span>
          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/25 focus:outline-none active:scale-95 dark:shadow-indigo-900/40"
          >
            Savatga
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
 *  Asosiy sahifa
 * ========================================================= */

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid"); // "grid" | "list"

  /* ---------- Ma'lumotlarni yuklash ("Qayta urinish" uchun ham ishlatiladi) ---------- */
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setError(
        "Mahsulotlarni yuklashda xatolik. Server ishga tushirilganini tekshiring.",
      );
      toast.error("Mahsulotlarni yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------- Kategoriyalar ---------- */
  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products],
  );

  /* ---------- Filtrlash va tartiblash ---------- */
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = products.filter((p) => {
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchCategory = category === "all" || p.category === category;
      return matchQuery && matchCategory;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "new":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        break;
    }
    return list;
  }, [products, query, category, sort]);

  const hasFilters = query.trim() || category !== "all" || sort !== "default";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* =========== Sarlavha =========== */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Mahsulotlar katalogi
        </h2>
        <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          {loading && (
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          )}
          {loading
            ? "Yuklanmoqda..."
            : `${visible.length} ta mahsulot topildi (jami ${products.length})`}
        </p>
      </div>

      {/* =========== Toolbar: qidiruv + tartiblash + ko'rinish =========== */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
        {/* Qidiruv */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-slate-400">
            <SearchIcon className="h-[18px] w-[18px]" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nomi, brend yoki kategoriya bo'yicha qidirish..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Tartiblash */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:flex-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-indigo-400"
          >
            <option value="default">Tartiblash</option>
            <option value="price-asc">Narx: arzondan qimmatga</option>
            <option value="price-desc">Narx: qimmatdan arzonga</option>
            <option value="rating">Reyting bo'yicha</option>
            <option value="name">Nom: A-Z</option>
            <option value="new">Avval yangilari</option>
          </select>

          {/* Ko'rinish almashtirgichi */}
          <div
            role="group"
            aria-label="Ko'rinishni tanlash"
            className="flex items-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950"
          >
            <button
              type="button"
              aria-label="To'r ko'rinish"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={`grid h-8 w-9 place-items-center rounded-lg transition ${
                view === "grid"
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 dark:bg-white/10 dark:text-indigo-300 dark:ring-white/10"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <GridIcon className="h-[17px] w-[17px]" />
            </button>
            <button
              type="button"
              aria-label="Ro'yxat ko'rinish"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={`grid h-8 w-9 place-items-center rounded-lg transition ${
                view === "list"
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 dark:bg-white/10 dark:text-indigo-300 dark:ring-white/10"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <ListIcon className="h-[17px] w-[17px]" />
            </button>
          </div>
        </div>
      </div>

      {/* =========== Kategoriya chiplari =========== */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ring-1 transition ${
                active
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 ring-indigo-600 dark:shadow-indigo-900/40"
                  : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              {cat === "all" ? "Barchasi" : cat}
            </button>
          );
        })}
      </div>

      {/* =========== Kontent: error → loading → bo'sh → ro'yxat =========== */}
      {error ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-rose-200 bg-rose-50/60 py-16 text-center dark:border-rose-500/20 dark:bg-rose-500/5">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-100 text-rose-500 dark:bg-rose-500/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path
                d="M12 9v4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
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
            <p className="mt-1 max-w-sm text-xs text-rose-500 dark:text-rose-400/80">
              {error}
            </p>
          </div>
          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-700 focus:ring-4 focus:ring-rose-500/25 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Spinner className="h-3.5 w-3.5" />
                Yuklanmoqda...
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
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
                Qayta urinish
              </>
            )}
          </button>
        </div>
      ) : loading ? (
        <div className="space-y-5">
          {/* Yuqoridagi harakatlanuvchi progress chizig'i */}
          <div className="h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="animate-slide h-full w-1/4 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-fuchsia-500" />
          </div>

          <SkeletonGrid count={8} />
        </div>
      ) : visible.length === 0 ? (
        /* Bo'sh holat */
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/5">
            <SearchIcon className="h-6 w-6" />
          </span>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Hech narsa topilmadi
          </p>
          <p className="max-w-xs text-xs text-slate-400">
            Qidiruv so'zini yoki filtrlarni o'zgartirib ko'ring.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setSort("default");
              }}
              className="mt-1 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <XIcon className="h-3.5 w-3.5" />
              Filtrlarni tozalash
            </button>
          )}
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
