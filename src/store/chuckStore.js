import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChuckStore = create(
  persist((set) => ({
    chuckPositions: [],
    setChuckPositions: (state) => set({ chuckPositions: state }),
  }))
);

export default useChuckStore;
