export interface ExperienceItem {
    title?: string;
    subtitle?: string;
    timeline?: string;
    tech?: string;
    details: string[];
}

export interface ExperienceData {
    theme?: string;
    icon?: string;
    items: ExperienceItem[];
}