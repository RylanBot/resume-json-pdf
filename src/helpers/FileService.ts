import { messageContainer } from "@/helpers/MessageContainer";
import useDataStore from "@/stores/dataStore";

export const importJson = (file: File) => {
    const { setProfileStore, setExperienceStore, setStyleStore } = useDataStore.getState();
    const reader = new FileReader();
    reader.onload = () => {
        const content = reader.result as string;
        try {
            const json = JSON.parse(content);
            const styleJson = json.style;
            const profileJson = json.profile;
            const experienceJson = json.experience;

            if (!styleJson || !profileJson || !experienceJson) throw new Error();

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
    const { profileStore, experienceStore, styleStore } = useDataStore.getState();
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
    if (!element) return;
    const clone = element.cloneNode(true) as HTMLElement;

    // 引入外部 link
    // eslint-disable-next-line prefer-const
    let links: { rel: string; href: string; crossOrigin?: string }[] = [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css', crossOrigin: 'anonymous' }
    ];
    
    const { styleStore } = useDataStore.getState();
    if (styleStore.fontStyle === 'fancy') {
        links.push(
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap' }
        );
    }

    links.forEach(linkAttrs => {
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', linkAttrs.rel);
        linkEl.setAttribute('href', linkAttrs.href);
        if (linkAttrs.crossOrigin) {
            linkEl.setAttribute('crossorigin', linkAttrs.crossOrigin);
        }
        clone.insertBefore(linkEl, clone.firstChild);
    });

    // 引入内部 CSS
    const styleSheets = Array.from(document.styleSheets);
    let cssString = '';
    styleSheets.forEach(sheet => {
        try {
            if (sheet.cssRules) {
                const rules = Array.from(sheet.cssRules);
                rules.forEach(rule => {
                    cssString += rule.cssText;
                });
            } else if (sheet.href) {
                cssString += `@import url('${sheet.href}');`;
            }
        } catch (error) {
            console.warn(error);
        }
    });

    const customCss = `
        .export-page {
            margin: 35px 0 !important;
        }
        .contact-icon {
            margin-top: 4px;
        }
        @media (max-width: 640px) {
            .export-page {
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            }
        }
    `;
    cssString += customCss;

    const styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode(cssString));
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