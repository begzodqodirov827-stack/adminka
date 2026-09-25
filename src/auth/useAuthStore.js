import { create } from "zustand";

/**
 * Sessiya: token + user ma'lumotlari.
 * "Meni eslab qol" -> localStorage, aks holda sessionStorage.
 * Token/storage DevTools orqali o'chirilsa ham store buni sezadi
 * (storage event + polling orqali) va ProtectedRoute darhol login ga yo'naltiradi.
 */

const TOKEN_KEY = "token";
const USER_KEY = "user-info";
const POLL_MS = 700;

function readToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

function readUser() {
  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed[0] ?? null) : parsed;
  } catch {
    return null;
  }
}

function clearStorage() {
  [localStorage, sessionStorage].forEach((s) => {
    s.removeItem(TOKEN_KEY);
    s.removeItem(USER_KEY);
  });
}

// Serverga qayta so'rov yubormaslik uchun token user yozuvida saqlanadi.
function saveSession(user, remember) {
  clearStorage();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, user.token);
  storage.setItem(USER_KEY, JSON.stringify(user));
}

function deleteSession() {
  clearStorage();
}

const useAuthStore = create((set, get) => ({
  token: readToken(),
  user: readUser(),

  login(user, remember = false) {
    saveSession(user, remember);
    set({ token: user.token, user });
  },

  logout() {
    deleteSession();
    set({ token: null, user: null });
  },

  // Holatni storage bilan sinxronlash (devtools'da o'chirilsa deb)
  syncFromStorage() {
    const { token } = get();
    const latest = readToken();
    if (latest !== token) {
      set({ token: latest, user: latest ? readUser() : null });
    }
  },
}));

/* Storage o'zgarishlarini kuzatish:
   - boshqa tab / DevTools o'chirsa -> 'storage' event
   - shu tabda DevTools'da o'chirsa -> polling (event bo'lmaydi) */
function startWatching() {
  window.addEventListener("storage", (e) => {
    if (e.key === TOKEN_KEY || e.key === USER_KEY || e.key === null) {
      useAuthStore.getState().syncFromStorage();
    }
  });

  let last = readToken();
  setInterval(() => {
    const now = readToken();
    if (now !== last) {
      last = now;
      useAuthStore.getState().syncFromStorage();
    }
  }, POLL_MS);
}
startWatching();

export { saveSession, deleteSession };
export default useAuthStore;
