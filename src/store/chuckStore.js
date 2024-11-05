import { create } from "zustand";

const useChuckStore = create((set) => ({
  chuckLength: 25,
  setChuckLength: (state) => set({ chuckLength: state }),
}));

export default useChuckStore;
