import useDataStore from "@/stores/dataStore";

export const loadResumeData = async (lang: string) => {
    const { setStyleStore, setProfileStore, setExperienceStore } = useDataStore.getState();

    const styleModule = await import(`@/data/style.json`);
    const styleJson = styleModule.default;
    const experienceModule = await import(`@/data/${lang}/experience.json`);
    const experienceJson = experienceModule.default;
    const profileModule = await import(`@/data/${lang}/profile.json`);
    const profileJson = profileModule.default;

    setStyleStore(styleJson);
    setProfileStore(profileJson);
    setExperienceStore(experienceJson);
}

export const formatTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length > 1) {
        return words[0] + '\n' + words.slice(1).join(' ');
    }
    return title;
}