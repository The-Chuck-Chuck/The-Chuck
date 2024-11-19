import { create } from "zustand";

const usePageStore = create((set) => ({
  isOpenedSimulatorModal: false,
  setIsOpenedSimulatorModal: (state) => set({ isOpenedSimulatorModal: state }),
}));

export default usePageStore;
