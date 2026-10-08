// GitHub Pages tidak mengenal route SPA. Salinan index.html sebagai 404.html
// membuat refresh di /raja-futsal/cart dst. tetap memuat aplikasi.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
