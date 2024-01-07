import { messageContainer } from "@/helpers/MessageContainer";
import useDataStore from "@/stores/dataStore";

import Ajv from "ajv";
const ajv = new Ajv();
const profileSchema = {
    type: "object",
    properties: {
        name: { type: "string" }
    },
    required: ["name"],
    additionalProperties: true
};
const validateProfile = ajv.compile(profileSchema);

function JsonService() {
    const { profileStore, experienceStore, styleStore, setProfileStore, setExperienceStore, setStyleStore } = useDataStore.getState();

    const importJson = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result as string;
            try {
                const json = JSON.parse(content);

                if (!validateProfile(json.profile)) {
                    messageContainer.info("Missing name value");
                    return;
                }

                const styleJson = json.style;
                const profileJson = json.profile;
                const experienceJson = json.experience;

                setStyleStore(styleJson);
                setProfileStore(profileJson);
                setExperienceStore(experienceJson);

            } catch (e) {
                messageContainer.info("Invalid JSON format");
            }
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