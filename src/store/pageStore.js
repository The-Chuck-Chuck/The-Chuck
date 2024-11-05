import { create } from "zustand";

const usePageStore = create((set) => ({
  isOpenedModal: false,
  setIsOpenedModal: (state) => set({ isOpenedModal: state }),
}));

export default usePageStore;
