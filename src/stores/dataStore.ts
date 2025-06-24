import { create } from 'zustand';

import type { ExperienceData, ProfileData, StyleData } from '@/types/data';

export interface TempStore {
  styleStore: StyleData;
  profileStore: ProfileData;
  experienceStore: ExperienceData[];
}

interface DataStore extends TempStore {
  tempStores: TempStore;
}

interface DataAction {
  setStyleStore: (newStyleData: StyleData) => void;
  setProfileStore: (newProfileData: ProfileData) => void;
  setExperienceStore: (newExperienceData: ExperienceData[]) => void;

  setTempStore: <K extends keyof TempStore>(key: K, newValue: TempStore[K]) => void;
  resetTempStore: <K extends keyof TempStore>(key: K) => void;
}

type DataState = DataStore & DataAction;

const useDataStore = create<DataState>((set) => ({
  styleStore: {},
  setStyleStore: (newStyleData: StyleData) => set({ styleStore: newStyleData }),

  profileStore: {},
  setProfileStore: (newProfileData: ProfileData) => set({ profileStore: newProfileData }),

  experienceStore: [],
  setExperienceStore: (newExperience: ExperienceData[]) => set({ experienceStore: newExperience }),

  tempStores: {
    styleStore: {},
    profileStore: {},
    experienceStore: []
  },
  setTempStore: <K extends keyof TempStore>(key: K, newValue: TempStore[K]) => set((state) => ({
    tempStores: { ...state.tempStores, [key]: newValue },
  })),
  resetTempStore: <K extends keyof TempStore>(key: K) => set((state) => ({
    tempStores: { ...state.tempStores, [key]: state[key] },
  })),
}));

export default useDataStore;
