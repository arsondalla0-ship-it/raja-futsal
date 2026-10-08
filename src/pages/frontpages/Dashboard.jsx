import { useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import ProductSearchBar from "../../components/ProductSearchBar";
import Pagination from "../../components/Pagination";
import { useProducts } from "../../context/ProductContext";

const PER_PAGE = 8;

export default function Dashboard() {
  const { products, getCategories } = useProducts();
  const [filter, setFilter] = useState({ keyword: "", category: "" });
  const [page, setPage] = useState(1);

  const handleSearch = (f) => { setFilter(f); setPage(1); };

  const filtered = useMemo(() => products.filter((p) =>
    p.name.toLowerCase().includes(filter.keyword.toLowerCase()) &&
    (filter.category === "" || p.category === Number(filter.category))
  ), [products, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Sepatu futsal untuk setiap lapangan</h1>
      <p className="text-gray-600 mb-4">{filtered.length} produk ditemukan</p>

      <ProductSearchBar onSearch={handleSearch} categories={getCategories()} showAddButton={false} />

      {shown.length === 0 ? (
        <p className="p-6 bg-white border rounded-lg text-gray-600">Tidak ada produk yang cocok.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shown.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
