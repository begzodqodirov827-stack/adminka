import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import useAuthStore from "../auth/useAuthStore";

/* Yo'nalish bo'yicha sahifa sarlavhasi */
const titles = {
  "/": "Bosh sahifa",
  "/products": "Mahsulotlar",
  "/profile": "Profil",
  "/settings": "Sozlamalar",
};

function Mainlayout({ children }) {
  const { pathname } = useLocation();

  // Mobil yon panel ochiq/yopiq
  const [open, setOpen] = useState(false);

  // Mavzu: "light" | "dark" | "system"
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "system",
  );

  // <html class="dark"> ni boshqarish (index.css dagi custom variant shunga bog'liq)
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const isDark = theme === "dark" || (theme === "system" && media.matches);
      root.classList.toggle("dark", isDark);
    };

    apply();
    localStorage.setItem("theme", theme);

    if (theme !== "system") return;
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  // Sessiyadan foydalanuvchi ma'lumotlari
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* min-w-0 — ichkaridagi uzun kontent qobiqni cho'zib yubormasligi uchun */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={titles[pathname] ?? "Adminka"}
          theme={theme}
          onTheme={setTheme}
          onMenu={() => setOpen(true)}
          user={user}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export default Mainlayout;
