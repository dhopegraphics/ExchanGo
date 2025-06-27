import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  selectedCategory: "all",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
