import { useState } from "react";
import { Link } from "react-router-dom";

// Dipakai ulang di Dashboard (showAddButton=false) dan AdminDashboard (showAddButton=true)
export default function ProductSearchBar({ onSearch, categories, showAddButton }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ keyword, category });
  };

  const handleChange = (field, value) => {
    const next = { keyword, category, [field]: value };
    if (field === "keyword") setKeyword(value); else setCategory(value);
    onSearch(next);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-md rounded-xl p-4 mb-6 gap-3">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
        <select
          value={category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 w-full sm:w-48"
        >
          <option value="">Semua Kategori</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input
          type="text"
          value={keyword}
          onChange={(e) => handleChange("keyword", e.target.value)}
          placeholder="Cari sepatu futsal..."
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Cari</button>
      </form>
      {showAddButton && (
        <Link to="/admin/add-product" className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 text-center">
          + Tambah Produk
        </Link>
      )}
    </div>
  );
}
