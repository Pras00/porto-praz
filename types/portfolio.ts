export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';
export type SkillCategory = 'frontend' | 'backend' | 'tools';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  image?: string; // Image URL (https://...), base64 data URL, or CSS gradient
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: SkillCategory;
}

export interface DeveloperInfo {
  name: string;
  title: string;
  tagline: string;
  subTagline: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}
