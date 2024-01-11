import { ExperienceData } from '@/types/experience';
import { Locale } from '@/types/locale';
import { ProfileData } from '@/types/profile';
import { StyleData } from '@/types/style';

import useDataStore from '@/stores/dataStore';

import enLang from '@/locales/en';
import zhLang from '@/locales/zh';

import styleJson from '@/data/style.json';

import experienceJsonEn from '@/data/en/experience.json';
import profileJsonEn from '@/data/en/profile.json';

import experienceJsonZh from '@/data/zh/experience.json';
import profileJsonZh from '@/data/zh/profile.json';

/**
 * 在这里添加所有支持的语言
 * 只根据国家区分（不考虑具体地区）
 */
export const VALID_LANG = ['en', 'zh'];

export type Language = typeof VALID_LANG[number];

interface LangData extends Record<Language, Locale> { }

interface JsonData {
    style: StyleData;
    experience: Record<Language, ExperienceData[]>;
    profile: Record<Language, ProfileData>;
}

/**
 * 配置对应的语言包
 */
export const LANG_PACK: LangData = {
    'en': enLang,
    'zh': zhLang,
}

/**
 * 配置对应的简历数据
 */
const RESUME_JSON: JsonData = {
    style: styleJson,
    experience: {
        'en': experienceJsonEn,
        'zh': experienceJsonZh,
    },
    profile: {
        'en': profileJsonEn,
        'zh': profileJsonZh,
    },
};

export const JsonInit = (lang: Language) => {
    const { setStyleStore, setProfileStore, setExperienceStore } = useDataStore.getState();
    setStyleStore(RESUME_JSON.style);
    setProfileStore(RESUME_JSON.profile[lang]);
    setExperienceStore(RESUME_JSON.experience[lang]);
}