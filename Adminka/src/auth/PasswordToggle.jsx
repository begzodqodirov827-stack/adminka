import React from "react";

/**
 * Parol maydoni uchun "ko'rsatish / yashirish" (eye) tugmasi.
 *
 * Ishlatilishi:
 *   const [showPassword, setShowPassword] = useState(false);
 *   <input type={showPassword ? "text" : "password"} ... />
 *   <PasswordToggle visible={showPassword} onToggle={() => setShowPassword(!showPassword)} />
 *
 * Props:
 *   visible  — parol hozir ko'rinayotgani (true = text, false = password)
 *   onToggle — tugma bosilganda chaqiriladi
 */
function PasswordToggle({ visible = false, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      // Tugma nomi holatga qarab o'zgaradi (screen reader'lar uchun)
      aria-label={visible ? "Parolni yashirish" : "Parolni ko'rsatish"}
      aria-pressed={visible}
      title={visible ? "Parolni yashirish" : "Parolni ko'rsatish"}
      className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
    >
      {visible ? (
        /* Ko'z qovoqli (yashirish) ikonkasi */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path
            d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          {/* Chiziq — ko'z "yopilgani"ni bildiradi */}
          <path
            d="M4 20L20 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        /* Oddiy (ko'rsatish) ikonkasi */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path
            d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </button>
  );
}

export default PasswordToggle;
