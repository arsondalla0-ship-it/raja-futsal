# Raja Futsal — Latihan React E-Commerce (Sepatu Futsal)

Struktur proyek terinspirasi dari arsitektur repo referensi dosen (Context API terpisah
untuk Auth/Cart/Product, layout Admin dengan proteksi login, pencarian + pagination,
konfirmasi hapus dengan toast) tetapi diadaptasi agar bisa jalan tanpa backend:

- Tidak memakai axios/React Query/Laravel API — semua data produk disimpan di state
  lokal (`ProductContext`), bukan database sungguhan.
- Login admin memakai akun demo yang dicek di sisi klien (`AuthContext`), bukan token
  dari server.
- Pelanggan bisa daftar akun baru di `/register`. Akun dan pesanan disimpan di `localStorage`
  browser (bukan database), dan kata sandi tidak di-hash — hanya untuk latihan.
- Upload gambar produk memakai FileReader (diubah jadi data URL), bukan upload ke server.

## Menjalankan
```
npm install
npm run dev
```
Toko: http://localhost:5173/
Admin: http://localhost:5173/admin/dashboard (redirect ke /login kalau belum masuk)

**Akun demo admin:** admin@rajafutsal.id / admin123


**Peran pengguna:** `admin` bisa membuka `/admin/*` (termasuk daftar pesanan); `customer` (hasil
registrasi) harus login untuk checkout dan bisa melihat riwayat di `/my-orders`.
