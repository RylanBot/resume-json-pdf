import { create } from "zustand";

interface ModeStore {
  isEditMode: boolean;
  isJsonMode: boolean;
}

interface ModeAction {
  setIsEditMode: (val: boolean) => void;
  setIsJsonMode: (val: boolean) => void;
}

type ModeState = ModeStore & ModeAction;

const useModeStore = create<ModeState>((set) => ({
  isEditMode: false,
  isJsonMode: false,
  setIsEditMode: (val) => set({ isEditMode: val }),
  setIsJsonMode: (val) => set({ isJsonMode: val })
}));

export default useModeStore;
