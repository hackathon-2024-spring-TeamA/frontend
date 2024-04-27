import { create } from "zustand";

// Sample Store
interface CountState {
  count: number;
  increaseOne: () => void;
  removeAll: () => void;
}

export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  increaseOne: () => set((state) => ({ count: state.count + 1 })),
  removeAll: () => set({ count: 0 }),
}));
