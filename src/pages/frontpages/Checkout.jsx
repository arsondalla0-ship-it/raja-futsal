import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import { rupiah } from "../../utils/format";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name ?? "", address: "", payment: "Transfer Bank" });
  const [errors, setErrors] = useState({});
  const [orderNo, setOrderNo] = useState(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    const err = {};
    if (form.name.trim().length < 3) err.name = "Nama minimal 3 karakter.";
    if (form.address.trim().length < 10) err.address = "Alamat minimal 10 karakter.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    const no = "RF-" + Date.now().toString().slice(-6);
    addOrder({
      orderNo: no,
      userEmail: user?.email ?? null,
      name: form.name.trim(),
      address: form.address.trim(),
      payment: form.payment,
      items,
      total,
    });
    setOrderNo(no);
    clear();
  };

  if (orderNo) {
    return (
      <div className="bg-white border rounded-lg p-6 max-w-lg">
        <h1 className="text-2xl font-bold mb-2">Pesanan diterima</h1>
        <p>Nomor pesanan <strong>{orderNo}</strong> atas nama {form.name} sedang diproses.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/" className="bg-blue-900 text-white rounded px-4 py-2">Belanja lagi</Link>
          <Link to="/my-orders" className="border rounded px-4 py-2">Lihat pesanan saya</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-4 text-gray-600">Belum ada produk untuk dibayar.</p>
        <Link to="/" className="text-blue-900 underline">Kembali ke produk</Link>
      </div>
    );
  }

  const field = "w-full border rounded px-3 py-2";

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="flex flex-col gap-4">
          <label>
            <span className="text-sm font-medium">Nama penerima</span>
            <input name="name" value={form.name} onChange={change} className={field} />
            {errors.name && <span className="text-sm text-red-600 block">{errors.name}</span>}
          </label>
          <label>
            <span className="text-sm font-medium">Alamat pengiriman</span>
            <textarea name="address" rows="3" value={form.address} onChange={change} className={field} />
            {errors.address && <span className="text-sm text-red-600 block">{errors.address}</span>}
          </label>
          <label>
            <span className="text-sm font-medium">Metode pembayaran</span>
            <select name="payment" value={form.payment} onChange={change} className={field}>
              <option>Transfer Bank</option>
              <option>QRIS</option>
              <option>Bayar di tempat</option>
            </select>
          </label>
          <button onClick={submit} className="bg-blue-900 text-white rounded px-5 py-2 hover:bg-blue-800">Pesan sekarang</button>
        </div>
      </div>
      <aside className="bg-white border rounded-lg p-4 h-fit">
        <h2 className="font-semibold mb-3">Ringkasan pesanan</h2>
        <ul className="divide-y">
          {items.map((i) => (
            <li key={i.id} className="py-2 flex justify-between text-sm">
              <span>{i.qty} × {i.name}</span>
              <span>{rupiah(i.qty * i.price)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between font-bold"><span>Total</span><span>{rupiah(total)}</span></p>
      </aside>
    </div>
  );
}
