import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useProducts } from "../../context/ProductContext";

export default function ProductEdit() {
  const { id } = useParams();
  const { getProductById, updateProduct, getCategories } = useProducts();
  const navigate = useNavigate();
  const categories = getCategories();
  const existing = getProductById(id);

  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", description: "", img: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name, category: existing.category, price: existing.price,
        stock: existing.stock, description: existing.desc, img: existing.img,
      });
    }
  }, [existing?.id]);

  if (!existing) {
    return <p>Produk tidak ditemukan.</p>;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setForm((f) => ({ ...f, img: reader.result }));
      reader.readAsDataURL(files[0]);
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Nama produk wajib diisi.";
    if (!form.price || Number(form.price) <= 0) err.price = "Harga harus lebih dari 0.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    updateProduct(id, form);
    toast.success("Produk berhasil diperbarui.");
    navigate("/admin/dashboard");
  };

  const input = (hasError) => `border rounded-md p-2 w-full ${hasError ? "border-red-500" : ""}`;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2">Edit Produk</h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Nama Produk</label>
        <input name="name" value={form.name} onChange={handleChange} className={input(errors.name)} />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Kategori</label>
        <select name="category" value={form.category} onChange={handleChange} className="border rounded-md p-2 w-full">
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Harga</label>
        <input name="price" type="number" value={form.price} onChange={handleChange} className={input(errors.price)} />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Stok</label>
        <input name="stock" type="number" value={form.stock} onChange={handleChange} className="border rounded-md p-2 w-full" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Deskripsi</label>
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} className="border rounded-md p-2 w-full" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Gambar Produk</label>
        <input name="img" type="file" accept="image/*" onChange={handleChange} className="border rounded-lg p-2 bg-gray-50" />
        {form.img && <img src={form.img} alt="Pratinjau" className="mt-2 w-24 h-24 object-cover rounded" />}
      </div>

      <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">Simpan Perubahan</button>
    </form>
  );
}
