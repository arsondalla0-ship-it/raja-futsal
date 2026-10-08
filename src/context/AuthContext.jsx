import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "raja_futsal_user";          // sesi yang sedang login
const USERS_KEY = "raja_futsal_users";           // akun pelanggan yang sudah mendaftar

// Akun admin demo karena proyek ini belum terhubung ke backend sungguhan.
const DEMO_ACCOUNTS = [
  { email: "admin@rajafutsal.id", password: "admin123", name: "Admin Toko", role: "admin" },
];

// Akun pelanggan disimpan di localStorage browser ini saja (bukan database).
// Catatan: kata sandi disimpan apa adanya hanya untuk latihan. Di proyek nyata,
// pendaftaran dan login harus lewat API dan kata sandi di-hash di server.
const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Muat sesi yang tersimpan saat aplikasi pertama kali dibuka
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const startSession = (account) => {
    const { password: _pw, ...safeUser } = account;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const login = async (email, password) => {
    const mail = email.trim().toLowerCase();
    const found = [...DEMO_ACCOUNTS, ...loadUsers()].find(
      (a) => a.email.toLowerCase() === mail && a.password === password
    );
    if (!found) return { success: false, message: "Email atau kata sandi salah." };
    const safeUser = startSession(found);
    return { success: true, user: safeUser };
  };

  // Daftar sebagai pelanggan baru, lalu langsung masuk
  const register = async ({ name, email, password }) => {
    const mail = email.trim().toLowerCase();
    const taken = [...DEMO_ACCOUNTS, ...loadUsers()].some((a) => a.email.toLowerCase() === mail);
    if (taken) return { success: false, message: "Email sudah terdaftar. Silakan masuk." };

    const account = { name: name.trim(), email: mail, password, role: "customer" };
    localStorage.setItem(USERS_KEY, JSON.stringify([...loadUsers(), account]));
    const safeUser = startSession(account);
    return { success: true, user: safeUser };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
