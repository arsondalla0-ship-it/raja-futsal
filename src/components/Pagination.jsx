export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-900 text-white hover:bg-blue-800"}`}
      >
        Sebelumnya
      </button>
      <div className="flex space-x-1">
        {pages.map((i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 rounded-md ${i === currentPage ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {i}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-900 text-white hover:bg-blue-800"}`}
      >
        Berikutnya
      </button>
    </div>
  );
}
