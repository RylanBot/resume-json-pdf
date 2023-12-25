import useDataStore from "@/stores/dataStore";

function JsonService() {
    const { profileStore, experienceStore, styleStore, setProfileStore, setExperienceStore, setStyleStore } = useDataStore();

    const importJson = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result as string;
            const json = JSON.parse(content);
            const styleJson = json.style;
            const profileJson = json.profile;
            const experienceJson = json.experience;
            setStyleStore(styleJson);
            setProfileStore(profileJson);
            setExperienceStore(experienceJson);
        };
        reader.readAsText(file);
    }

    const exportJson = () => {
        const data = { style: styleStore, profile: profileStore, experience: experienceStore };
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "resume.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    return { importJson, exportJson };
}

export default JsonService;