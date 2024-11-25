import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChuckStore = create(
  persist((set) => ({
    chuckPositionsList: [],
    encodedPositionsData: "",
    isSharedLinks: false,
    setChuckPositionsList: (state) => set({ chuckPositionsList: state }),
    setEncodedPositionsData: (state) => set({ encodedPositionsData: state }),
    setIsSharedLinks: (state) => set({ isSharedLinks: state }),
  }))
);

export default useChuckStore;
