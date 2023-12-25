
import { create, } from 'zustand';

import { ExperienceData } from '../types/experience';
import { ProfileData } from '../types/profile';
import { StyleData } from '../types/style';

import experienceJson from '@/data/experience.json';
import profileJson from "@/data/profile.json";
import styleJson from '@/data/style.json';

export interface TempStore {
  styleStore?: StyleData;
  profileStore?: ProfileData;
  experienceStore?: ExperienceData[];
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
  styleStore: styleJson,
  setStyleStore: (newStyleData: StyleData) => set({ styleStore: newStyleData }),

  profileStore: profileJson,
  setProfileStore: (newProfileData: ProfileData) => set({ profileStore: newProfileData }),

  experienceStore: experienceJson,
  setExperienceStore: (newExperience: ExperienceData[]) => set({ experienceStore: newExperience }),

  tempStores: {
    styleStore: styleJson,
    profileStore: profileJson,
    experienceStore: experienceJson
  },
  setTempStore: <K extends keyof TempStore>(key: K, newValue: TempStore[K]) => set((state) => ({
    tempStores: { ...state.tempStores, [key]: newValue },
  })),
  resetTempStore: <K extends keyof TempStore>(key: K) => set((state) => ({
    tempStores: { ...state.tempStores, [key]: state[key] },
  })),
}));

export default useDataStore;
