export interface CVProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  profileImage: string;
}

export interface ExperienceEntry {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  field?: string;
  period: string;
  details?: string;
}

export interface SkillCategoryEntry {
  category: string;
  skills: string[];
}

export interface LanguageEntry {
  language: string;
  proficiency: string;
  level: number;
}

export interface VolunteerEntry {
  organization: string;
  role: string;
  period: string;
  description: string[];
}

export interface CVData {
  profile: CVProfile;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillCategoryEntry[];
  languages: LanguageEntry[];
  volunteer: VolunteerEntry[];
}
