import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChuckStore = create(
  persist((set) => ({
    chuckPositionsList: [],
    setChuckPositionsList: (state) => set({ chuckPositionsList: state }),
  }))
);

export default useChuckStore;
