import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Halaman asal (mis. /checkout) supaya setelah login kembali ke sana
  const from = location.state?.from;

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
    else navigate(from || "/", { replace: true });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.success) setError(result.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg border">
        <h2 className="text-2xl font-bold text-center">Masuk ke Raja Futsal</h2>
        {from && (
          <p className="text-center text-sm text-blue-900 bg-blue-50 rounded-lg p-2">
            Silakan masuk dulu untuk melanjutkan.
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-center text-sm text-red-700 bg-red-50 rounded-lg">{error}</div>}
          <input
            type="email" required placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg"
          />
          <input
            type="password" required placeholder="Kata sandi" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg"
          />
          <button type="submit" disabled={submitting} className="w-full py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-blue-400">
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" state={{ from }} className="text-blue-900 font-medium underline">Daftar sekarang</Link>
        </p>
        <p className="text-center text-xs text-gray-400">
          Admin demo: admin@rajafutsal.id / admin123
        </p>
        <Link to="/" className="block text-center text-sm text-gray-500 hover:text-gray-900">← Kembali ke toko</Link>
      </div>
    </div>
  );
}
