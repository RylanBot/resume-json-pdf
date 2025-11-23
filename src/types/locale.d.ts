export interface Locale {
  common: Common;
  field: Field;
}

type CommonKeys =
  | "IMPORT_JSON"
  | "EXPORT_OPTIONS"
  | "SETTING"
  | "SAVE"
  | "CANCEL"
  | "UPLOAD_AVATAR"
  | "LATEST_NOTICE"
  | "CHANGELOG_VIEW"
  | "CHANGELOG_FILE"
  | "VISUALIZATION"
  | "SOURCE";

type Common = Record<CommonKeys, string>;

export type FieldKey =
  | "TEMPLATE"
  | "COLOR"
  | "PAGE_PADDING_Y"
  | "PROFILE_MARGIN_BOTTOM"
  | "EXPERIENCE_MARGIN_BOTTOM"
  | "FOOTNOTE_PADDING_X"
  | "CONTACT_PADDING_X"
  | "DETAILS_FONT"
  | "FONT_STYLE"
  | "FONT_PLACEHOLDER";

type Field = Record<FieldKey, string>;
