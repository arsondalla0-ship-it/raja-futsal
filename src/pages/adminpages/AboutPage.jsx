export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <div className="bg-white p-6 rounded shadow space-y-2">
        <p>Raja Futsal adalah latihan React Component bertema e-commerce sepatu futsal.</p>
        <p className="text-sm text-gray-600">
          Arsitekturnya terinspirasi dari struktur referensi dosen: Context API terpisah untuk
          Auth, Cart, dan Product, layout Admin dengan proteksi login, pencarian + pagination,
          serta konfirmasi hapus memakai react-hot-toast. Data produk masih dummy/lokal
          (belum terhubung ke API Laravel sungguhan).
        </p>
      </div>
    </div>
  );
}
