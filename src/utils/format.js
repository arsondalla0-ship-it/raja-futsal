// Format angka ke Rupiah
export const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

// Ubah nama produk menjadi slug untuk URL (mis. "Raja Futsal Blaze IN" -> "raja-futsal-blaze-in")
export const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
