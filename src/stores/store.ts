import { create } from 'zustand';

import { ExperienceData } from './experience';
import { ProfileData } from './profile';

import profileJson from "@/data/profile.json";
import experienceJson from '@/data/experience.json';

interface AppStore {
  editModeStore: boolean,
  profileStore: ProfileData;
  experienceStore: ExperienceData[];
}

interface AppActions {
  setEditModeStore: (state: boolean) => void
  setProfileStore: (newProfileData: ProfileData) => void;
  setExperienceStore: (newExperienceData: ExperienceData[]) => void;
}

type StoreState = AppStore & AppActions;

const useStore = create<StoreState>((set) => ({
  editModeStore: false,
  setEditModeStore: (state: boolean) => set({ editModeStore: state }),

  profileStore: profileJson,
  setProfileStore: (newProfileData) => set({ profileStore: newProfileData }),

  experienceStore: experienceJson,
  setExperienceStore: (newExperience) => set({ experienceStore: newExperience }),
}));

export default useStore;