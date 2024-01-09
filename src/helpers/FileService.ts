import { messageContainer } from "@/helpers/MessageContainer";
import useDataStore from "@/stores/dataStore";

const { profileStore, experienceStore, styleStore, setProfileStore, setExperienceStore, setStyleStore } = useDataStore.getState();

export const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
        const content = reader.result as string;
        try {
            const json = JSON.parse(content);
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

export const exportJson = () => {
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

export const exportHtml = () => {
    const element = document.getElementById('export-html');

    const styleSheets = Array.from(document.styleSheets);
    let cssString = '';
    styleSheets.forEach(sheet => {
        if (sheet.cssRules) {
            const rules = Array.from(sheet.cssRules);
            rules.forEach(rule => {
                cssString += rule.cssText;
            });
        } else if (sheet.href) {
            cssString += `@import url('${sheet.href}');`;
        }
    });

    const customCss = `
        #export-page {
            margin: 35px 0 !important;
            width: 210mm !important;
            height: 286mm !important;
        }
    `;
    cssString += customCss;

    const styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode(cssString));

    const clone = element!.cloneNode(true) as HTMLElement;
    clone.insertBefore(styleEl, clone.firstChild);

    const html = clone.outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.html';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}