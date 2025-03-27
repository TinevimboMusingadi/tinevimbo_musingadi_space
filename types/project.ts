import { ReactElement } from 'react';

export type IconName = 'SiPython' | 'SiTensorflow' | 'SiPytorch' | 'SiReact' | 'SiNextdotjs' | 'SiOpenai';

export interface Skill {
  name: string;
  iconName: IconName;
  icon?: ReactElement;
}

export interface ProjectDetails {
  summary: string;
  keyObjectives: string[];
  challenges: string[];
  learnings: string[];
}

export interface ProjectLinks {
  github?: string;
  youtube?: string;
  documentation?: string;
}

export interface ProjectContent {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: ReactElement;
  image: string;
  content: string;
  skills: Skill[];
  details: ProjectDetails;
  links: ProjectLinks;
  galleryImages: string[];
} 