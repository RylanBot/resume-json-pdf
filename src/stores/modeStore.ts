import { create } from "zustand";

interface ModeSate {
    editModeStore: boolean,
}

interface ModeAction {
    setEditModeStore: (newEditMode: boolean) => void
}

type ModeState = ModeSate & ModeAction;

const useModeStore = create<ModeState>((set) => ({
    editModeStore: false,
    setEditModeStore: (newEditMode) => set({ editModeStore: newEditMode }),
}));

export default useModeStore;