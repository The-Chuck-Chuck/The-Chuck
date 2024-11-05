import { create } from "zustand";

const usePageStore = create((set) => ({
  isOpenedInitial: false,
  setIsOpenedInitial: (state) => set({ isOpenedModal: state }),
}));

export default usePageStore;
