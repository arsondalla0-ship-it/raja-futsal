import { Link } from "react-router-dom";

// Props dikirim dari AdminLayout: sidebarOpen (boolean) dan setSidebarOpen (fungsi)
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-white shadow-md`}>
      <div className="p-4 font-bold text-xl">Raja Futsal Admin</div>
      <nav className="flex flex-col p-4 space-y-2" onClick={() => setSidebarOpen(false)}>
        <Link to="/admin/dashboard" className="hover:bg-gray-200 p-2 rounded">Dashboard</Link>
        <Link to="/admin/orders" className="hover:bg-gray-200 p-2 rounded">Pesanan</Link>
        <Link to="/admin/add-product" className="hover:bg-gray-200 p-2 rounded">+ Tambah Produk</Link>
        <Link to="/admin/about" className="hover:bg-gray-200 p-2 rounded">About</Link>
        <Link to="/" className="p-2 text-sm text-gray-500 hover:text-gray-900">← Kembali ke toko</Link>
      </nav>
    </div>
  );
}
