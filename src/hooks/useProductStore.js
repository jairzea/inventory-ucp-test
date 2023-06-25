import { create } from "zustand";

// Aquí se almacenan los productos
export const useProductStore = create((set) => ({
  products: [],
  productToEdit: {},
  setProductToEdit: (product) =>
    set((state) => ({ productToEdit: product })),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
