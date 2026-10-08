import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Kalau sudah login, tidak perlu daftar lagi
  useEffect(() => {
    if (user) navigate(user.role === "admin" ? "/admin/dashboard" : from || "/", { replace: true });
  }, [user]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (form.name.trim().length < 3) err.name = "Nama minimal 3 karakter.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = "Format email tidak valid.";
    if (form.password.length < 6) err.password = "Kata sandi minimal 6 karakter.";
    if (form.confirm !== form.password) err.confirm = "Konfirmasi kata sandi tidak sama.";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);
    if (!result.success) return setErrors({ email: result.message });
    toast.success("Akun berhasil dibuat. Selamat datang!");
  };

  const field = "w-full px-4 py-2.5 border rounded-lg";
  const msg = (k) => errors[k] && <span className="text-sm text-red-600 block mt-1">{errors[k]}</span>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg border">
        <h2 className="text-2xl font-bold text-center">Daftar Akun Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <label className="block">
            <input name="name" placeholder="Nama lengkap" value={form.name} onChange={change} className={field} />
            {msg("name")}
          </label>
          <label className="block">
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} className={field} />
            {msg("email")}
          </label>
          <label className="block">
            <input name="password" type="password" placeholder="Kata sandi (min. 6 karakter)" value={form.password} onChange={change} className={field} />
            {msg("password")}
          </label>
          <label className="block">
            <input name="confirm" type="password" placeholder="Ulangi kata sandi" value={form.confirm} onChange={change} className={field} />
            {msg("confirm")}
          </label>
          <button type="submit" disabled={submitting} className="w-full py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-blue-400">
            {submitting ? "Memproses..." : "Daftar"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" state={{ from }} className="text-blue-900 font-medium underline">Masuk</Link>
        </p>
        <Link to="/" className="block text-center text-sm text-gray-500 hover:text-gray-900">← Kembali ke toko</Link>
      </div>
    </div>
  );
}
