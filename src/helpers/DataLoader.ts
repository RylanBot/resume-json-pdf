/* 一次性 import，避免动态加载耗时 */
import useDataStore from '@/stores/dataStore';

import { ExperienceData } from '@/types/experience';
import { ProfileData } from '@/types/profile';
import { StyleData } from '@/types/style';

import styleJson from '@/data/style.json';

import experienceJsonEn from '@/data/en/experience.json';
import profileJsonEn from '@/data/en/profile.json';

import experienceJsonCn from '@/data/cn/experience.json';
import profileJsonCn from '@/data/cn/profile.json';

export const validLangs = ['en', 'cn'];

export type Language = typeof validLangs[number]; // 如果添加新语言即直接操作 validLangs

interface JsonData {
    style: StyleData;
    experience: Record<Language, ExperienceData[]>;
    profile: Record<Language, ProfileData>;
}

const jsonData: JsonData = {
    style: styleJson,
    experience: {
        en: experienceJsonEn,
        cn: experienceJsonCn,
    },
    profile: {
        en: profileJsonEn,
        cn: profileJsonCn,
    },
};

function DataLoader(lang: Language) {
    const { setStyleStore, setProfileStore, setExperienceStore } = useDataStore.getState();
    setStyleStore(jsonData.style);
    setProfileStore(jsonData.profile[lang]);
    setExperienceStore(jsonData.experience[lang]);
}

export default DataLoader;