/**
 * =============================
 * | Editor          | Preview |
 * |-----------------|---------|
 * | visual / source |         | 
 * ============================= 
 */

import { create } from "zustand";

interface ModeStore {
  editorActive: boolean;
  inSourceMode: boolean;
}

interface ModeAction {
  setEditorActive: (val: boolean) => void;
  setInSourceMode: (val: boolean) => void;
}

type ModeState = ModeStore & ModeAction;

const useModeStore = create<ModeState>((set) => ({
  editorActive: false,
  inSourceMode: false,
  setEditorActive: (val) => set({ editorActive: val }),
  setInSourceMode: (val) => set({ inSourceMode: val })
}));

export default useModeStore;
