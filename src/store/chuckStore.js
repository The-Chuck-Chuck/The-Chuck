import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChuckStore = create(
  persist((set) => ({
    chuckPositionsList: [],
    isSharedLinks: false,
    setChuckPositionsList: (state) => set({ chuckPositionsList: state }),
    setIsSharedLinks: (state) => set({ isSharedLinks: state }),
  }))
);

export default useChuckStore;
