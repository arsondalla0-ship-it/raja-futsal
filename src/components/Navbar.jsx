import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl tracking-tight">Raja Futsal</Link>
        <button className="md:hidden border rounded px-2 py-1" onClick={() => setOpen(!open)}>☰</button>
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-200">Produk</Link>
          <Link to="/cart" className="hover:text-blue-200">
            Keranjang
            {count > 0 && <span className="ml-2 bg-orange-500 text-xs px-2 py-0.5 rounded-full">{count}</span>}
          </Link>
          <Link to="/checkout" className="hover:text-blue-200">Checkout</Link>
          {user ? (
            <>
              {user.role === "admin"
                ? <Link to="/admin/dashboard" className="hover:text-blue-200">Admin</Link>
                : <Link to="/my-orders" className="hover:text-blue-200">Pesanan Saya</Link>}
              <Link to="/logout" className="hover:text-blue-200">Logout ({user.name})</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="bg-orange-500 hover:bg-orange-600 rounded px-3 py-1">Daftar</Link>
            </>
          )}
        </div>
      </div>
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-2" onClick={() => setOpen(false)}>
          <Link to="/" className="px-2 py-1">Produk</Link>
          <Link to="/cart" className="px-2 py-1">Keranjang ({count})</Link>
          <Link to="/checkout" className="px-2 py-1">Checkout</Link>
          {user ? (
            <>
              {user.role === "admin"
                ? <Link to="/admin/dashboard" className="px-2 py-1">Admin</Link>
                : <Link to="/my-orders" className="px-2 py-1">Pesanan Saya</Link>}
              <Link to="/logout" className="px-2 py-1">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="px-2 py-1">Login</Link>
              <Link to="/register" className="px-2 py-1">Daftar</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
