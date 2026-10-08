import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { rupiah } from "../../utils/format";

const tanggal = (iso) =>
  new Date(iso).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

export default function MyOrders() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const mine = orders.filter((o) => o.userEmail === user.email);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pesanan Saya</h1>
      {mine.length === 0 ? (
        <div>
          <p className="mb-4 text-gray-600">Kamu belum punya pesanan.</p>
          <Link to="/" className="text-blue-900 underline">Mulai belanja</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {mine.map((o) => (
            <div key={o.orderNo} className="bg-white border rounded-lg p-4">
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <div>
                  <p className="font-semibold">{o.orderNo}</p>
                  <p className="text-sm text-gray-500">{tanggal(o.createdAt)}</p>
                </div>
                <span className="self-start text-sm bg-blue-100 text-blue-800 rounded px-2 py-1">{o.status}</span>
              </div>
              <ul className="divide-y">
                {o.items.map((i) => (
                  <li key={i.id} className="py-2 flex items-center gap-3 text-sm">
                    <img src={i.img} alt={i.name} className="w-12 h-12 object-cover rounded" />
                    <span className="flex-1">{i.qty} × {i.name}</span>
                    <span>{rupiah(i.qty * i.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 flex justify-between font-bold"><span>Total</span><span>{rupiah(o.total)}</span></p>
              <p className="text-sm text-gray-600 mt-2">Dikirim ke: {o.address} · {o.payment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
