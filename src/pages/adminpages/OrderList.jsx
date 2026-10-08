import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useOrders, ORDER_STATUSES } from "../../context/OrderContext";
import { rupiah } from "../../utils/format";

const badge = {
  Baru: "bg-blue-100 text-blue-800",
  Diproses: "bg-yellow-100 text-yellow-800",
  Dikirim: "bg-purple-100 text-purple-800",
  Selesai: "bg-green-100 text-green-800",
  Dibatalkan: "bg-red-100 text-red-800",
};

const tanggal = (iso) =>
  new Date(iso).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

export default function OrderList() {
  const { orders, updateStatus, deleteOrder } = useOrders();
  const [open, setOpen] = useState(null);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Pesanan Masuk ({orders.length})</h1>

      {orders.length === 0 ? (
        <p className="bg-white rounded shadow p-6 text-gray-600">Belum ada pesanan.</p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">No. Pesanan</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Pembeli</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <Fragment key={o.orderNo}>
                  <tr className="border-t align-top">
                    <td className="p-3 font-medium">{o.orderNo}</td>
                    <td className="p-3 text-sm">{tanggal(o.createdAt)}</td>
                    <td className="p-3">{o.name}</td>
                    <td className="p-3">{rupiah(o.total)}</td>
                    <td className="p-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.orderNo, e.target.value)}
                        className={`rounded px-2 py-1 text-sm ${badge[o.status]}`}
                      >
                        {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="p-3 space-x-3 whitespace-nowrap">
                      <button onClick={() => setOpen(open === o.orderNo ? null : o.orderNo)} className="text-blue-700 hover:underline">
                        {open === o.orderNo ? "Tutup" : "Detail"}
                      </button>
                      <button
                        onClick={() => { if (confirm(`Hapus pesanan ${o.orderNo}?`)) { deleteOrder(o.orderNo); toast.success("Pesanan dihapus."); } }}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                  {open === o.orderNo && (
                    <tr className="bg-gray-50">
                      <td colSpan="6" className="p-4 text-sm">
                        <p><strong>Alamat:</strong> {o.address}</p>
                        <p className="mb-3"><strong>Pembayaran:</strong> {o.payment}</p>
                        <ul className="divide-y max-w-lg">
                          {o.items.map((i) => (
                            <li key={i.id} className="py-2 flex items-center gap-3">
                              <img src={i.img} alt={i.name} className="w-12 h-12 object-cover rounded" />
                              <span className="flex-1">{i.qty} × {i.name}</span>
                              <span>{rupiah(i.qty * i.price)}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
