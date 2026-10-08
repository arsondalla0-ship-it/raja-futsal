import { createContext, useContext, useState } from "react";
import { products as initialProducts, categories } from "../data/products";
import { slugify } from "../utils/format";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const isLoading = false;
  const isError = false;

  const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
  const getProductById = (id) => products.find((p) => p.id === Number(id));
  const getCategories = () => categories;

  const addProduct = (data) => {
    const id = Date.now();
    const cat = categories.find((c) => c.id === Number(data.category));
    const newProduct = {
      id,
      slug: slugify(data.name) + "-" + id,
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock) || 0,
      category: Number(data.category),
      category_name: cat?.name ?? "",
      rating: 0,
      desc: data.description || "",
      img: data.img || `https://picsum.photos/seed/rajafutsal-${id}/400/300`,
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, data) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== Number(id)) return p;
        const cat = categories.find((c) => c.id === Number(data.category));
        return {
          ...p,
          name: data.name,
          price: Number(data.price),
          stock: Number(data.stock) || 0,
          category: Number(data.category),
          category_name: cat?.name ?? p.category_name,
          desc: data.description ?? p.desc,
          img: data.img || p.img,
        };
      })
    );
  };

  // Dibungkus mutateAsync supaya pola pemanggilannya tetap sama seperti versi React Query
  const deleteProduct = {
    mutateAsync: async (id) => {
      setProducts((prev) => prev.filter((p) => p.id !== Number(id)));
    },
  };

  return (
    <ProductContext.Provider
      value={{ products, isLoading, isError, getProductBySlug, getProductById, addProduct, updateProduct, deleteProduct, getCategories }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
