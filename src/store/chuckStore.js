import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChuckStore = create(
  persist((set) => ({
    chuckPositionsList: [],
    isClickSkip: false,
    setChuckPositionsList: (state) => set({ chuckPositionsList: state }),
    setIsClickSkip: (state) => set({ isClickSkip: state }),
  }))
);

export default useChuckStore;
