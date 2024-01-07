export interface Locale {
    common: Common;
    field: Field;
}

interface Common {
    IMPORT_JSON: string;
    EXPORT_OPTIONS: string;
    EXPORT_JSON: string;
    EXPORT_PDF: string;
    SETTING: string;
    SAVE: string;
    CANCEL: string;
    UPLOAD_AVATAR: string;
}

interface Field {
    TEMPLATE: string;
    COLOR: string;
    PAGE_PADDING_Y: string;
    PROFILE_MARGIN_BOTTOM: string;
    EXPERIENCE_MARGIN_BOTTOM: string;
    FOOTNOTE_PADDING_X: string;
    CONTACT_PADDING_X: string;
}