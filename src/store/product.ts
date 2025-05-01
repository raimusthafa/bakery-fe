import { create } from "zustand";
import { Product } from "../api/products";

interface ProductState {
  products: Product[];
  shouldRefresh: boolean;
  setProducts: (products: Product[]) => void;
  clearProducts: () => void;
  triggerRefresh: () => void;
  clearRefresh: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  shouldRefresh: false,
  setProducts: (products) => set({ products }),
  clearProducts: () => set({ products: [] }),
  triggerRefresh: () => set({ shouldRefresh: true }),
  clearRefresh: () => set({ shouldRefresh: false }),
}));
