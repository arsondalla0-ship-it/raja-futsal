import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { rupiah } from "../../utils/format";

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const { getProductBySlug } = useProducts();
  const { addItem } = useCart();

  // Produk diambil dari state Link kalau ada (lebih cepat), kalau tidak dicari ulang via context
  // (mis. saat halaman di-refresh langsung dari URL)
  const p = location.state || getProductBySlug(slug);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  if (!p) {
    return (
      <div>
        <p className="mb-4">Produk tidak ditemukan.</p>
        <Link to="/" className="text-blue-900 underline">Kembali ke daftar produk</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    setReviews([...reviews, { id: Date.now(), rating, review }]);
    setRating(0);
    setReview("");
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <img src={p.img} alt={p.name} className="w-full rounded-lg object-cover h-80" />
        <div className="flex flex-col gap-3">
          <Link to="/" className="text-sm text-gray-500">← Semua produk</Link>
          <span className="text-sm text-gray-500">{p.category_name}</span>
          <h1 className="text-3xl font-bold">{p.name}</h1>
          <p className="text-2xl text-blue-900 font-bold">{rupiah(p.price)}</p>
          <p className="text-gray-700">{p.desc}</p>
          <p className="text-sm text-gray-500">Stok tersisa: {p.stock}</p>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center border rounded bg-white">
              <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="px-3 min-w-8 text-center">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(Math.min(p.stock, qty + 1))}>+</button>
            </div>
            <button onClick={handleAdd} className="bg-blue-900 text-white rounded px-5 py-2 hover:bg-blue-800">
              Tambah ke keranjang
            </button>
          </div>
          {added && <p className="text-blue-900 text-sm">{qty} × {p.name} masuk keranjang. <Link to="/cart" className="underline">Lihat keranjang</Link></p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Ulasan Pengguna</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">Belum ada ulasan.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="text-amber-500 mb-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  <p className="text-gray-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="border rounded-lg p-4 bg-white shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-3">Tulis Ulasan</h2>
          <form onSubmit={submitReview}>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button" key={star} onClick={() => setRating(star)} className={`text-2xl ${star <= rating ? "text-amber-500" : "text-gray-300"}`}>★</button>
                ))}
              </div>
            </div>
            <textarea
              value={review} onChange={(e) => setReview(e.target.value)} rows="3"
              placeholder="Bagaimana pengalaman memakai sepatu ini?"
              className="w-full border rounded-lg p-3 mb-3"
            />
            <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">Kirim Ulasan</button>
          </form>
        </section>
      </div>
    </div>
  );
}
