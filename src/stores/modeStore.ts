import { create } from "zustand";

interface ModeStore {
    editModeStore: boolean,
}

interface ModeAction {
    setEditModeStore: (newEditMode: boolean) => void
}

type ModeState = ModeStore & ModeAction;

const useModeStore = create<ModeState>((set) => ({
    editModeStore: false,
    setEditModeStore: (newEditMode) => set({ editModeStore: newEditMode }),
}));

export default useModeStore;