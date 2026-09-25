import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import PasswordToggle from "./PasswordToggle";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "./useAuthStore";

const labelCls =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10";

const inputWithIconCls = inputCls + " pl-11";

function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  return Math.min(score, 3);
}

const strengthLabels = ["", "Zayif", "O'rtacha", "Kuchli"];

function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);
  const strengthLabel = strengthLabels[strength];
  const passwordsMatch =
    confirmPassword.length > 0 && confirmPassword === password;

  const handeRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !surname.trim() || !email.trim() || !password) {
      toast.error("Iltimos barcha maydonlarni to'ldiring.");
      return;
    }

    if (name.trim().length < 3) {
      toast.error("Ism kamida 3 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (surname.trim().length < 3) {
      toast.error("Familiya kamida 3 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (password.length < 8) {
      toast.error("Parol kamida 8 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Parollar mos kelmadi!");
      return;
    }

    if (!agreement) {
      toast.error(
        "Iltimos foydalanish shartlari va maxfiylik siyosatiga rozilik bildiring.",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get("http://localhost:4000/users");
      const users = Array.isArray(res.data) ? res.data : [];

      const existingUser = users.find(
        (u) => String(u.email).toLowerCase() === email.trim().toLowerCase(),
      );

      if (existingUser) {
        if (existingUser.password !== password) {
          toast.error(
            "Bu email allaqachon ro'yxatdan o'tgan. Login sahifasidan kiring.",
          );
          setTimeout(() => navigate("/login"), 1500);
          return;
        }

        login(existingUser, false);

        toast.success("Bu hisob allaqachon mavjud — siz login qildingiz!");
        navigate("/", { replace: true });
        return;
      }

      const token = crypto.randomUUID();
      const newUser = {
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim().toLowerCase(),
        password,
        token,
      };

      const postRes = await axios.post("http://localhost:4000/users", newUser);
      login(postRes.data, false);

      toast.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz!");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(
        "Serverga ulanishda xatolik. Server ishga tushirilganini tekshiring.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      badge="Bepul boshlang"
      title="Hisob yarating"
      subtitle="Bir necha daqiqada ro'yxatdan o'ting va boshqaruv panelidan foydalaning."
    >
      <form onSubmit={(e) => handeRegister(e)} className="space-y-5">
        {/* Ism / Familiya */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelCls}>
              Ism
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Akmal"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="lastName" className={labelCls}>
              Familiya
            </label>
            <input
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Mordayev"
              className={inputCls}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 grid w-11 place-items-center text-slate-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M4 8l7.1 4.7a2 2 0 002.2 0L20 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="siz@example.com"
              className={inputWithIconCls}
            />
          </div>
        </div>

        {/* Parol */}
        <div>
          <label htmlFor="password" className={labelCls}>
            Parol
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 grid w-11 place-items-center text-slate-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="10"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 10V7.5a4 4 0 118 0V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Kamida 8 ta belgi"
              className={inputWithIconCls + " pr-12"}
            />
            {/* Ko'rsatish/yashirish (eye icon) */}
            <PasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
          </div>

          {/* Parol kuchi indikatori — holatga qarab dinamik */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex h-1.5 flex-1 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-full transition ${
                    password && i < strength
                      ? strength === 1
                        ? "bg-rose-500"
                        : strength === 2
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-400">{strengthLabel}</span>
          </div>
        </div>

        {/* Parolni tasdiqlash */}
        <div>
          <label htmlFor="confirmPassword" className={labelCls}>
            Parolni tasdiqlash
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Parolni qayta kiriting"
              className={inputCls + " pr-12"}
            />
            <PasswordToggle
              visible={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((v) => !v)}
            />
          </div>
          {confirmPassword.length > 0 && (
            <p
              className={`mt-1.5 text-xs font-medium ${
                passwordsMatch
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {passwordsMatch
                ? "✓ Parollar mos keladi"
                : "✗ Parollar mos kelmadi"}
            </p>
          )}
        </div>

        {/* Shartlar */}
        <label
          htmlFor="terms"
          className="flex cursor-pointer items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
        >
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 dark:border-slate-600"
          />
          <span>
            Men{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
            >
              foydalanish shartlari
            </a>{" "}
            va{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
            >
              maxfiylik siyosati
            </a>
            ga roziman.
          </span>
        </label>

        {/* Asosiy tugma */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/25 focus:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-indigo-900/40"
        >
          {loading ? "Saqlanmoqda..." : "Ro'yxatdan o'tish"}
        </button>

        {/* Ajratgich */}
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs text-slate-400">yoki</span>
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Ijtimoiy tugmalar */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.2 14.7 2.2 12 2.2 6.5 2.2 2.1 6.6 2.1 12.1S6.5 22 12 22c5.7 0 9.5-4 9.5-9.6 0-.7-.1-1.2-.2-1.7H12z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0012 2z" />
            </svg>
            GitHub
          </button>
        </div>
      </form>

      {/* Pastki havola */}
      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Hisobingiz bormi?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
        >
          Kirish
        </Link>
      </p>
    </AuthShell>
  );
}

export default Register;
