import { create } from "zustand";
import { Product } from "../api/products";

interface ProductState {
  products: Product[];
  shouldRefresh: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  setProducts: (products: Product[]) => void;
  clearProducts: () => void;
  setPagination: (pagination: { current: number; pageSize: number; total: number }) => void;
  triggerRefresh: () => void;
  clearRefresh: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  shouldRefresh: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  setProducts: (products) => set({ products }),
  clearProducts: () => set({ products: [] }),
  setPagination: (pagination) => set({ pagination }),
  triggerRefresh: () => set({ shouldRefresh: true }),
  clearRefresh: () => set({ shouldRefresh: false }),
}));
