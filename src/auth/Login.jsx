import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import PasswordToggle from "./PasswordToggle";
import { toast } from "react-toastify";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const labelCls =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const loggedIn = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    if (!cleanEmail || !cleanPassword) {
      toast.error("Email va parolni kiriting!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get("http://localhost:4000/users");
      const users = Array.isArray(res.data) ? res.data : [];

      const user = users.find(
        (u) =>
          String(u.email).toLowerCase() === cleanEmail &&
          u.password === cleanPassword,
      );

      if (user) {
        // Foydalanuvchi yozuvida hali token bo'lmasa, bir marta yaratamiz
        if (!user.token) {
          user.token = crypto.randomUUID();
          await axios.patch(`http://localhost:4000/users/${user.id}`, {
            token: user.token,
          });
        }

        login(user, remember);
        toast.success("Siz login qildingiz!");
        
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error("Parol yoki email xato");
      }
    } catch (error) {
      console.log(error);
      toast.error("Serverga ulanishda xatolik. Server ishga tushirilganini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      badge="Xush kelibsiz"
      title="Hisobingizga kiring"
      subtitle="Davom etish uchun email va parolingizni kiriting."
    >
      <form onSubmit={(e) => loggedIn(e)} className="space-y-5">
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
              className={inputCls}
            />
          </div>
        </div>

        {/* Parol */}
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Parol
            </label>
            <a
              href="#"
              className="text-xs font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
            >
              Parolni unutdingizmi?
            </a>
          </div>

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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputCls + " pr-12"}
            />
            {/* Ko'rsatish/yashirish tugmasi (eye icon) */}
            <PasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
          </div>
        </div>

        {/* Eslab qolish */}
        <label
          htmlFor="remember"
          className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
        >
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 dark:border-slate-600"
          />
          Meni eslab qol
        </label>

        {/* Asosiy tugma */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/25 focus:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-indigo-900/40"
        >
          {loading ? "Kirilyapti..." : "Kirish"}
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
        Hisobingiz yo'qmi?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
        >
          Ro'yxatdan o'tish
        </Link>
      </p>
    </AuthShell>
  );
}

export default Login;
