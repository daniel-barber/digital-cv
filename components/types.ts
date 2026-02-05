export interface ProfileData {
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

export interface ExperienceData {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface ProjectData {
  title: string;
  context: string;
  period: string;
  description: string[];
}

export interface EducationData {
  school: string;
  degree: string;
  field?: string;
  period: string;
  details?: string;
}

export interface SkillCategoryData {
  category: string;
  skills: string[];
}

export interface LanguageData {
  language: string;
  proficiency: string;
  level: number;
}

export interface VolunteerData {
  organization: string;
  role: string;
  period: string;
  description: string[];
}

export interface CVData {
  profile: ProfileData;
  summary: string;
  experience: ExperienceData[];
  projects?: ProjectData[];
  education: EducationData[];
  skills: SkillCategoryData[];
  languages: LanguageData[];
  volunteer: VolunteerData[];
}

// Made with Bob
