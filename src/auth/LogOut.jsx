import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "./useAuthStore";

function LogOut() {
  const navigate = useNavigate();

  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    logout();

    toast.info("Siz tizimdan chiqdingiz!");

    const timer = setTimeout(() => navigate("/login", { replace: true }), 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 dark:bg-slate-950">
      <p className="text-sm text-slate-500 dark:text-slate-400">Chiqilyapti...</p>
    </div>
  );
}

export default LogOut;
