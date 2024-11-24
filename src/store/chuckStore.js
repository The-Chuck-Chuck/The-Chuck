import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChuckStore = create(
  persist((set) => ({
    chuckPositionsList: [],
    encodedPositionsData: "",
    setChuckPositionsList: (state) => set({ chuckPositionsList: state }),
    setEncodedPositionsData: (state) => set({ encodedPositionsData: state }),
  }))
);

export default useChuckStore;
