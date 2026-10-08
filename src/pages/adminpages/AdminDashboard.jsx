import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductSearchBar from "../../components/ProductSearchBar";
import { confirmDeleteToast } from "../../components/ConfirmDeleteToast";
import { useProducts } from "../../context/ProductContext";
import { rupiah } from "../../utils/format";

export default function AdminDashboard() {
  const { products, isLoading, isError, deleteProduct, getCategories } = useProducts();
  const [filter, setFilter] = useState({ keyword: "", category: "" });

  if (isLoading) return <p>Memuat...</p>;
  if (isError) return <p>Gagal memuat produk.</p>;

  const filtered = useMemo(() => products.filter((p) =>
    p.name.toLowerCase().includes(filter.keyword.toLowerCase()) &&
    (filter.category === "" || p.category === Number(filter.category))
  ), [products, filter]);

  const handleDelete = (id) => {
    confirmDeleteToast(async () => {
      try {
        await deleteProduct.mutateAsync(id);
        toast.success("Produk berhasil dihapus.");
      } catch {
        toast.error("Terjadi kesalahan saat menghapus produk.");
      }
    });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manajemen Produk</h1>
      <ProductSearchBar onSearch={setFilter} categories={getCategories()} showAddButton={true} />

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">#</th>
              <th className="p-3">Gambar</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3"><img src={p.img} alt={p.name} className="w-14 h-14 object-cover rounded" /></td>
                <td className="p-3">{p.name}<br /><small className="text-gray-500">{p.category_name}</small></td>
                <td className="p-3">{rupiah(p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 space-x-3">
                  <Link to={`/admin/edit-product/${p.id}`} className="text-blue-700 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
