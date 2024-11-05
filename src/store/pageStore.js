import { create } from "zustand";

const useStore = create((set) => ({
  isOpenedModal: false,
  setIsOpenedModal: (state) => set({ isOpenedModal: state }),
}));

export default useStore;
