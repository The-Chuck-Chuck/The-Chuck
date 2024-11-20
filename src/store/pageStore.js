import { create } from "zustand";

const usePageStore = create((set) => ({
  isOpenedSimulatorModal: false,
  isOpenedTutorialModal: false,
  setIsOpenedSimulatorModal: (state) => set({ isOpenedSimulatorModal: state }),
  setIsOpenedTutorialModal: (state) => set({ isOpenedTutorialModal: state }),
}));

export default usePageStore;
