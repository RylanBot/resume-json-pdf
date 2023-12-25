type ProfileFootnote = {
  label?: string;
  content?: string;
}

type ProfileInfo = {
  icon?: string;
  key?: string;
  value?: string;
  link?: string;
}

export interface ProfileData {
  name?: string;
  avatar?: string;
  footnote?: ProfileFootnote[];
  info?: ProfileInfo[];
}