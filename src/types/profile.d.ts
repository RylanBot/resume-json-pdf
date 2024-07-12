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