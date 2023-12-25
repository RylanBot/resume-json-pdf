export interface ExperienceItem {
    title?: string;
    subtitle?: string;
    timeline?: string;
    tech?: string;
    details?: string[];
}

export interface ExperienceData {
    section?: string;
    icon?: string;
    items?: ExperienceItem[];
}