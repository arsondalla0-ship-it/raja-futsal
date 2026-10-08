import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { rupiah } from "../utils/format";

// Komponen reusable: dipakai di halaman Dashboard untuk tiap produk
export default function ProductCard({ p }) {
  const { addItem } = useCart();
  const stars = Math.round(p.rating);

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg bg-white flex flex-col">
      <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-xs text-gray-500">{p.category_name}</span>
        <h2 className="font-semibold">{p.name}</h2>
        <p className="text-blue-900 font-bold">{rupiah(p.price)}</p>
        <div className="text-amber-500 text-sm">
          {"★".repeat(stars)}{"☆".repeat(5 - stars)}
          <span className="text-gray-400 ml-1">({p.rating})</span>
        </div>
        <div className="mt-auto pt-3 flex gap-2">
          {/* Produk dikirim lewat state Link agar halaman detail tidak perlu fetch ulang */}
          <Link to={`/product/${p.slug}`} state={p} className="flex-1 text-center border rounded px-3 py-2 text-sm hover:bg-gray-100">
            Lihat Detail
          </Link>
          <button onClick={() => addItem(p)} className="flex-1 bg-blue-900 text-white rounded px-3 py-2 text-sm hover:bg-blue-800">
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
