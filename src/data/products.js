import { slugify } from "../utils/format";

// Kategori produk toko
export const categories = [
  { id: 1, name: "Indoor" },
  { id: 2, name: "Turf" },
  { id: 3, name: "Society" },
  { id: 4, name: "Aksesoris" },
];

// Data dummy sementara (pengganti API/database sungguhan)
// Harga hanya perkiraan; sesuaikan dengan harga toko Anda.
const raw = [
  { name: "Nike Mercurial Vapor 16 Academy IC", category: 1, price: 1249000, stock: 18, rating: 4.7, desc: "Sepatu futsal indoor ringan dengan sol karet non-marking, dirancang untuk akselerasi dan kecepatan." },
  { name: "Nike Phantom GX 2 Academy IC", category: 1, price: 1299000, stock: 10, rating: 4.6, desc: "Upper bertekstur untuk kontrol bola maksimal, grip kuat di lantai parket dan vinyl." },
  { name: "Adidas Predator League Sala IN", category: 1, price: 1199000, stock: 12, rating: 4.6, desc: "Sol gum indoor dengan zona kontrol bola di bagian depan, nyaman untuk pertandingan intens." },
  { name: "Nike Tiempo Legend 10 Academy TF", category: 2, price: 1199000, stock: 15, rating: 4.7, desc: "Upper sintetis lembut dengan outsole studs pendek untuk rumput sintetis." },
  { name: "Adidas Predator Club TF", category: 2, price: 899000, stock: 14, rating: 4.5, desc: "Outsole turf dengan cengkeraman stabil, cocok untuk lapangan rumput sintetis basah maupun kering." },
  { name: "Puma Ultra 5 Play TT", category: 2, price: 849000, stock: 9, rating: 4.4, desc: "Ringan dan responsif dengan sol turf trainer untuk permainan cepat." },
  { name: "Mizuno Morelia Sala Classic IN", category: 3, price: 1099000, stock: 8, rating: 4.8, desc: "Siluet klasik dengan upper kulit sintetis yang nyaman, favorit pemain yang suka sentuhan bola halus." },
  { name: "Asics Calcetto WD 9", category: 3, price: 899000, stock: 11, rating: 4.5, desc: "Stabil dan awet, dengan bantalan nyaman untuk bermain lama di lapangan society." },
  { name: "Nike Jr. Mercurial Vapor 16 Academy IC", category: 1, price: 899000, stock: 20, rating: 4.6, desc: "Sepatu futsal indoor anak, ringan dan mudah dipakai dengan desain yang sama seperti versi dewasa." },
  { name: "Nike Everyday Plus Cushioned Socks (3 Pasang)", category: 4, price: 249000, stock: 50, rating: 4.6, desc: "Kaos kaki berbantalan dengan teknologi Dri-FIT untuk menjaga kaki tetap kering." },
  { name: "Adidas Tiro League Shin Guards", category: 4, price: 189000, stock: 30, rating: 4.4, desc: "Pelindung tulang kering ringan dengan bentuk ergonomis dan perlindungan andal." },
  { name: "Nike Academy Team Football Duffel Bag", category: 4, price: 499000, stock: 22, rating: 4.5, desc: "Tas duffel dengan kompartemen sepatu terpisah dan ventilasi agar sepatu tidak lembap." },
];

// Foto taruh di: public/images/products/<slug>.jpg
// Contoh: public/images/products/nike-mercurial-vapor-16-academy-ic.jpg
export const products = raw.map((p, i) => {
  const id = i + 1;
  const cat = categories.find((c) => c.id === p.category);
  const baseSlug = slugify(p.name);
  return {
    id,
    slug: baseSlug + "-" + id,
    name: p.name,
    price: p.price,
    stock: p.stock,
    category: p.category,
    category_name: cat?.name ?? "",
    rating: p.rating,
    desc: p.desc,
    img: `/images/products/${baseSlug}.jpg`,
  };
});

// Gambar cadangan jika file foto belum ada
export const FALLBACK_IMG = "https://placehold.co/400x300?text=Raja+Futsal";