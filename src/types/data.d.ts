type ProfileContact = {
    icon?: string;
    value?: string;
}

export interface ProfileData {
    name?: string;
    avatar?: string;
    footnote?: string[];
    contact?: ProfileContact[];
}

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

export interface StyleData {
    template?: string,
    fontStyle?: string,
    color?: string,
    pagePy?: number
    profileMb?: number,
    experienceMb?: number,
    plainFootPx?: number,
    plainContactPx?: number,
    detailsFont?: number
}