import { create } from "zustand";

const useChuckStore = create((set) => ({
  chuckPositions: [],
  setChuckPositions: (state) => set({ isOpenedModal: state }),
}));

export default useChuckStore;
