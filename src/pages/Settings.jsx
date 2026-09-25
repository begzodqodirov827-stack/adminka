import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../auth/useAuthStore";
import PasswordToggle from "../auth/PasswordToggle";
import ConfirmDeleteAccount from "../components/ConfirmDeleteAccount";

const API_URL = "http://localhost:4000/users";

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

const LockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 10.5V8a4 4 0 018 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="15.2" r="1.2" fill="currentColor" />
  </svg>
);

const BellIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M18 10a6 6 0 10-12 0c0 4-1.5 5.5-1.5 5.5h15S18 14 18 10z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M10 18.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M20 13.5A8 8 0 1110.5 4 6.5 6.5 0 0020 13.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 3l7.5 3v5.5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5V6l7.5-3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9.2 12l2 2 3.6-3.8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CameraIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 8.5A2.5 2.5 0 016.5 6h1l1.2-1.8a1 1 0 01.8-.45h5a1 1 0 01.8.45L16.5 6h1A2.5 2.5 0 0120 8.5v8a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5v-8z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 12.5l4.5 4.5L19 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const SaveIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 5h11l3 3v11a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M8 5v4h6V5M8 19v-5h8v5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

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

/* =========================================================
 *  YORDAMCHI KOMPONENTLAR
 * ========================================================= */

/* Toggle switch — holat props'dan keladi */
function Toggle({ enabled, onToggle, label, description, icon: Icon }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400">
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={onToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:ring-4 focus:outline-none ${
          enabled
            ? "bg-indigo-600 focus:ring-indigo-500/25"
            : "bg-slate-200 focus:ring-slate-200 dark:bg-slate-700 dark:focus:ring-slate-700/50"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

/* Seksiya kartasi */
function SectionCard({ icon: Icon, iconBg, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${iconBg}`}>
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

/* =========================================================
 *  ASOSIY SAHIFA
 * ========================================================= */

function Settings() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  /* ---------- Shakl holatlari (login'dagi kabi useState) ---------- */
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ---------- Sening koding: hisobni o'chirish ---------- */
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false); // modalni boshqarish steyti

  /* ---------- Sening koding: parol kuchi (useState + useEffect) ---------- */
  const [strength, setStrength] = useState(0); // 0—4 orasida baho

  // Parol qanchalik kuchli ekanini tekshiradigan funksiya
  const checkPassword = (pass) => {
    let score = 0;

    if (pass.length >= 8) score++; // kamida 8 ta belgi
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++; // katta-kichik harflar
    if (/[0-9]/.test(pass)) score++; // raqam bor
    if (/[^A-Za-z0-9]/.test(pass)) score++; // maxsus belgi bor (!@#$...)

    return score;
  };

  // Parol o'zgarganda avtomatik tekshiriladi
  useEffect(() => {
    setStrength(checkPassword(password));
  }, [password]);

  // Foydalanuvchi ma'lumotlari localStorage'dan
  const userData = JSON.parse(localStorage.getItem("user-info"));
  const id = userData?.id; // ?. — localStorage bo'sh bo'lsa ham kod yiqilmaydi

  /* Serverdan foydalanuvchi ma'lumotini olish */
  const getData = async () => {
    try {
      let res = await axios.get(`http://localhost:4000/users/${id}`);
      setData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  /* Modalda "Ha, o'chirish" bosilganda ishlaydi */
  const deleteUser = async () => {
    try {
      let res = await axios.delete(`http://localhost:4000/users/${id}`);

      localStorage.clear();
      sessionStorage.clear();
      setShowModal(false); // o'chirilgach modalni yopamiz
      navigate("/register");
    } catch (error) {
      console.log("error", error);
    }
  };

  /* ---------- Toggle holatlari ---------- */
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  /* ---------- Ma'lumotlarni saqlash (json-server PATCH) ---------- */
  const saveProfile = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanSurname = surname.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanSurname || !cleanEmail) {
      toast.error("Ism, familiya va emailni kiriting!");
      return;
    }

    setSaving(true);

    try {
      // Yangilanishlar: bo'sh maydonlar yuborilmaydi
      const updates = { name: cleanName, surname: cleanSurname, email: cleanEmail };
      if (password.trim()) {
        updates.password = password;
      }

      await axios.patch(`${API_URL}/${user.id}`, updates);

      // Store va storage'dagi user yozuvini ham yangilash
      const updatedUser = { ...user, ...updates };
      const remember = Boolean(localStorage.getItem("token"));
      useAuthStore.getState().login(updatedUser, remember);

      toast.success("Ma'lumotlar saqlandi!");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Saqlashda xatolik. Server ishga tushirilganini tekshiring.");
    } finally {
      setSaving(false);
    }
  };

  const initials =
    `${(name || "").trim().charAt(0)}${(surname || "").trim().charAt(0)}`.toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* =========== Sarlavha =========== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Sozlamalar
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Hisobingizni moslashtiring va shaxsiy ma'lumotlaringizni boshqaring.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20">
          <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
          Faol sessiya
        </span>
      </div>

      {/* =========== 1. Profil ma'lumotlari =========== */}
      <SectionCard
        icon={UserIcon}
        iconBg="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
        title="Profil ma'lumotlari"
        description="Shaxsiy ma'lumotlaringizni yangilang"
      >
        {/* Avatar + kamera belgisi */}
        <div className="mb-5 flex items-center gap-4">
          <div className="relative">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xl font-bold text-white shadow-lg">
              {initials}
            </div>
            <span className="absolute -right-1 -bottom-1 grid h-7 w-7 place-items-center rounded-full bg-white text-indigo-600 shadow-md ring-1 ring-slate-200 dark:bg-slate-800 dark:text-indigo-400 dark:ring-slate-700">
              <CameraIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Profil rasmi</p>
            <p className="text-xs text-slate-400">PNG yoki JPG, maks. 2 MB</p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Ism */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Ism
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-slate-400">
                  <UserIcon className="h-[17px] w-[17px]" />
                </span>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ali"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>
            </div>

            {/* Familiya */}
            <div>
              <label htmlFor="surname" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Familiya
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-slate-400">
                  <UserIcon className="h-[17px] w-[17px]" />
                </span>
                <input
                  id="surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Valiyev"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-slate-400">
                <MailIcon className="h-[17px] w-[17px]" />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ali@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">Bu email hisobga kirishda ishlatiladi.</p>
          </div>

          {/* Parol — o'z PasswordToggle komponenti bilan */}
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Yangi parol
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-slate-400">
                <LockIcon className="h-[17px] w-[17px]" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-12 pl-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
              />
              <PasswordToggle
                visible={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              O'zgartirishni istamasangiz bo'sh qoldiring.
            </p>

            {/* Parol kuchi — checkPassword + useEffect natijasi */}
            {password && (
              <div className="mt-3">
                {/* 4 bo'lakli progress */}
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        i <= strength
                          ? strength === 1
                            ? "bg-rose-500"
                            : strength === 2
                              ? "bg-amber-500"
                              : strength === 3
                                ? "bg-sky-500"
                                : "bg-emerald-500"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Parol kuchi:</span>
                  <span
                    className={`font-bold ${
                      strength === 1
                        ? "text-rose-500"
                        : strength === 2
                          ? "text-amber-500"
                          : strength === 3
                            ? "text-sky-500"
                            : "text-emerald-500"
                    }`}
                  >
                    {strength === 1 && "Kuchsiz"}
                    {strength === 2 && "O'rtacha"}
                    {strength === 3 && "Yaxshi"}
                    {strength === 4 && "Kuchli"}
                  </span>
                </p>

                {/* Qanday qilib kuchli qilish kerakligi */}
                {strength < 4 && (
                  <p className="mt-1 text-[11px] text-slate-400">
                    Kamida 8 belgi, katta-kichik harf, raqam va maxsus belgi (
                    <span className="font-semibold">!@#$</span>) ishlating.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Saqlash tugmalari */}
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setName(user?.name || "");
                setSurname(user?.surname || "");
                setEmail(user?.email || "");
                setPassword("");
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/25 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-indigo-900/40"
            >
              {saving ? (
                <>
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saqlanyapti...
                </>
              ) : (
                <>
                  <SaveIcon className="h-3.5 w-3.5" />
                  Saqlash
                </>
              )}
            </button>
          </div>
        </form>
      </SectionCard>

      {/* =========== 2. Bildirishnomalar =========== */}
      <SectionCard
        icon={BellIcon}
        iconBg="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        title="Bildirishnomalar"
        description="Qanday xabarlarni olishni tanlang"
      >
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Toggle
            icon={BellIcon}
            enabled={notifications}
            onToggle={() => setNotifications(!notifications)}
            label="Push bildirishnomalar"
            description="Mahsulot va buyurtmalar haqida tezkor xabarlar"
          />
          <Toggle
            icon={MailIcon}
            enabled={emailUpdates}
            onToggle={() => setEmailUpdates(!emailUpdates)}
            label="Email yangilanishlari"
            description="Haftalik hisobot va aksiyalar elektron pochtaga"
          />
        </div>
      </SectionCard>

      {/* =========== 3. Tashqi ko'rinish =========== */}
      <SectionCard
        icon={MoonIcon}
        iconBg="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
        title="Tashqi ko'rinish"
        description="Interfeys rejimini tanlang"
      >
        <Toggle
          icon={MoonIcon}
          enabled={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          label="Tungi rejim"
          description="Ko'zga qulay qorong'i mavzu"
        />

        {/* Mavzu tanlash */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {["Indigo", "Emerald", "Rose"].map((name) => (
            <div
              key={name}
              className={`rounded-xl border-2 p-2.5 ${
                name === "Indigo"
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              <span
                className={`mb-2 block h-10 w-full rounded-lg bg-gradient-to-br ${
                  name === "Indigo"
                    ? "from-indigo-500 to-indigo-600"
                    : name === "Emerald"
                      ? "from-emerald-500 to-teal-600"
                      : "from-rose-500 to-pink-600"
                }`}
              />
              <span className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                {name}
                {name === "Indigo" && (
                  <CheckIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                )}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* =========== 4. Xavfsizlik =========== */}
      <SectionCard
        icon={ShieldIcon}
        iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        title="Xavfsizlik"
        description="Hisobingizni himoya qilish sozlamalari"
      >
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Toggle
            icon={ShieldIcon}
            enabled={twoFactor}
            onToggle={() => setTwoFactor(!twoFactor)}
            label="Ikki bosqichli tasdiqlash"
            description="Kirishda SMS yoki ilova orqali qo'shimcha kod talab qilinadi"
          />
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-50 p-3.5 ring-1 ring-amber-200/70 dark:bg-amber-500/5 dark:ring-amber-400/20">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300/90">
            Hisob xavfsizligini oshirish uchun ikki bosqichli tasdiqlashni yoqish tavsiya etiladi.
          </p>
        </div>
      </SectionCard>

      {/* =========== Xavfli zona =========== */}
      <section className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-sm dark:border-rose-500/20 dark:bg-slate-900">
        <div className="flex items-center gap-3 border-b border-rose-100 px-5 py-4 dark:border-rose-500/10">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
            <TrashIcon className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Xavfli zona</h3>
            <p className="text-xs text-slate-400">Bu amallarni qaytarib bo'lmaydi</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Hisobni o'chirib tashlash</p>
            <p className="text-xs text-slate-400">
              Barcha ma'lumotlaringiz butunlay o'chiriladi. Bu amalni bekor qilish mumkin emas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowModal(true); // modalni ochamiz
              getData(); // serverdan yangi ma'lumot olamiz
            }}
            className="w-fit rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
          >
            Hisobni o'chirish
          </button>
        </div>
      </section>

      {/* ---------- Hisobni o'chirishni tasdiqlash modali ---------- */}
      <ConfirmDeleteAccount
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteUser}
        userData={data}
      />
    </div>
  );
}

export default Settings;
