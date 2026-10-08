import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
        <Outlet />
      </main>
      <footer className="bg-blue-950 text-blue-100 text-center p-4 text-sm">
        © 2025 Raja Futsal — Toko Sepatu Futsal | Versi 1.0
      </footer>
    </div>
  );
}
