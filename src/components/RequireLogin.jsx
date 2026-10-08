import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Bungkus halaman yang butuh login. Kalau belum masuk, arahkan ke /login
// dan ingat halaman asalnya supaya setelah login kembali ke sini.
export default function RequireLogin({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}
