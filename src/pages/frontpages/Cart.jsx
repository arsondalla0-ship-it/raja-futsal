import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { rupiah } from "../../utils/format";

export default function Cart() {
  const { items, setQty, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Keranjang</h1>
        <p className="mb-4 text-gray-600">Keranjang masih kosong.</p>
        <Link to="/" className="inline-block bg-blue-900 text-white rounded px-4 py-2">Pilih sepatu</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <img src={i.img} alt={i.name} className="w-16 h-16 rounded-md object-cover" />
              <div>
                <h2 className="font-semibold">{i.name}</h2>
                <p className="text-gray-600 text-sm">{rupiah(i.price)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number" min="1" value={i.qty}
                onChange={(e) => setQty(i.id, Number(e.target.value))}
                className="w-16 border rounded px-2 py-1 text-center"
              />
              <span className="font-medium w-28 text-right">{rupiah(i.price * i.qty)}</span>
              <button onClick={() => removeItem(i.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-lg">Total: <strong>{rupiah(total)}</strong></p>
        <Link to="/checkout" className="bg-blue-900 text-white rounded px-5 py-2 hover:bg-blue-800">Lanjut ke checkout</Link>
      </div>
    </div>
  );
}
