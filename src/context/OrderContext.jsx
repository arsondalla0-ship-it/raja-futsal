import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext(null);
const KEY = "raja-futsal-orders";

export const ORDER_STATUSES = ["Baru", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];

// Pesanan disimpan di localStorage (tidak ada backend), jadi tetap ada saat halaman di-refresh.
const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
};

export function OrderProvider({ children }) {
  // pesanan: { orderNo, name, address, payment, items[], total, status, createdAt }
  const [orders, setOrders] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(orders));
    } catch {
      /* penyimpanan penuh / dinonaktifkan: abaikan */
    }
  }, [orders]);

  const addOrder = (order) =>
    setOrders((prev) => [{ ...order, status: "Baru", createdAt: new Date().toISOString() }, ...prev]);

  const updateStatus = (orderNo, status) =>
    setOrders((prev) => prev.map((o) => (o.orderNo === orderNo ? { ...o, status } : o)));

  const deleteOrder = (orderNo) => setOrders((prev) => prev.filter((o) => o.orderNo !== orderNo));

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
