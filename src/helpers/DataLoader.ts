import useDataStore from '@/stores/dataStore';

import { COMMON_STYLE, EN_EXPERIENCE, EN_PROFILE, ZH_EXPERIENCE, ZH_PROFILE } from '@/data';
import { EN_LANG, ZH_LANG } from '@/locales';

import type { ExperienceData, ProfileData, StyleData } from '@/types/data';
import type { Locale } from '@/types/locale';

/**
 * 在这里添加所有支持的语言
 * 只根据国家区分（不考虑具体地区）
 */
export const VALID_LANG = ['en', 'zh'];

export type Language = typeof VALID_LANG[number];

interface LangData extends Record<Language, Locale> { }

interface ResumeData {
    style: StyleData;
    experience: Record<Language, ExperienceData[]>;
    profile: Record<Language, ProfileData>;
}

/**
 * 配置对应的语言包
 */
export const LOCALE: LangData = {
    'en': EN_LANG,
    'zh': ZH_LANG,
}

/**
 * 配置对应的简历数据
 */
const RESUME_JSON: ResumeData = {
    style: COMMON_STYLE,
    experience: {
        'en': EN_EXPERIENCE,
        'zh': ZH_EXPERIENCE,
    },
    profile: {
        'en': EN_PROFILE,
        'zh': ZH_PROFILE,
    },
};

export const initResumeData = (lang: Language) => {
    const { setStyleStore, setProfileStore, setExperienceStore } = useDataStore.getState();
    setStyleStore(RESUME_JSON.style);
    setProfileStore(RESUME_JSON.profile[lang]);
    setExperienceStore(RESUME_JSON.experience[lang]);
}