import toast from "react-hot-toast";

export const confirmDeleteToast = (onConfirm) => {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-800">Hapus produk ini dari katalog?</p>
      <div className="flex justify-end gap-2">
        <button onClick={() => toast.dismiss(t.id)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-md">Batal</button>
        <button
          onClick={() => { onConfirm(); toast.dismiss(t.id); }}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
        >
          Hapus
        </button>
      </div>
    </div>
  ), { duration: 4000 });
};
