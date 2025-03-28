import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { ProjectContent, Skill, IconName } from '@/types/project';
import { FaCode, FaRobot, FaWater, FaCloud } from 'react-icons/fa';
import React from 'react';

// Define the type for project data in JSON
type ProjectDataType = {
  [key: string]: {
    title: string;
    description: string;
    category: string;
    icon: 'FaCode' | 'FaRobot' | 'FaWater' | 'FaCloud';
    image: string;
    content: string;
    skills: {
      name: string;
      iconName: IconName;
    }[];
    details: {
      summary: string;
      keyObjectives: string[];
      challenges: string[];
      learnings: string[];
    };
    links: {
      github?: string;
      youtube?: string;
      documentation?: string;
    };
    galleryImages: string[];
  };
};

// Import project data statically with type
import rawProjectsData from '@/public/content/projects/projects.json';

// Type assertion for the imported data
const projectsData = rawProjectsData as unknown as ProjectDataType;

// Map string icons to React components
const iconComponents = {
  'FaCode': FaCode,
  'FaRobot': FaRobot,
  'FaWater': FaWater,
  'FaCloud': FaCloud
} as const;

export async function getProjectContent(projectId: string): Promise<ProjectContent | null> {
  try {
    // Get project metadata from the static JSON
    const metadata = projectsData[projectId];
    if (!metadata) {
      console.error(`Project ${projectId} not found in projects.json`);
      return null;
    }

    // Process markdown content with remark
    const processedContent = await remark()
      .use(html)
      .process(metadata.content);
    const contentHtml = processedContent.toString();

    // Replace relative paths with absolute paths
    const processedHtml = contentHtml.replace(
      /(src|href)="\.\//g,
      `$1="/content/projects/${projectId}/`
    );

    // Get gallery images from metadata
    const galleryImages = metadata.galleryImages || [];

    // Convert skills to include proper icon types
    const skills: Skill[] = metadata.skills.map(skill => ({
      name: skill.name,
      iconName: skill.iconName
    }));

    // Create icon element
    const IconComponent = iconComponents[metadata.icon] || FaCode;
    const icon = React.createElement(IconComponent, { className: "text-2xl" });

    // Ensure image path is absolute
    const image = metadata.image.startsWith('/')
      ? metadata.image
      : `/content/projects/${projectId}/${metadata.image}`;

    return {
      id: projectId,
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      icon,
      image,
      content: processedHtml,
      skills,
      details: metadata.details,
      links: metadata.links,
      galleryImages: galleryImages.map(img => 
        img.startsWith('/') ? img : `/content/projects/${projectId}/gallery/${img}`
      )
    };
  } catch (error) {
    console.error(`Error loading project ${projectId}:`, error);
    return null;
  }
}

export async function getAllProjects(): Promise<ProjectContent[]> {
  try {
    console.log('Loading projects from:', projectsData);
    const projectIds = Object.keys(projectsData);
    console.log('Found project IDs:', projectIds);
    
    const projects = await Promise.all(
      projectIds.map(async (id) => {
        const content = await getProjectContent(id);
        if (!content) {
          console.error(`Failed to load project: ${id}`);
        }
        return content;
      })
    );

    const validProjects = projects.filter((project): project is ProjectContent => project !== null);
    console.log('Loaded projects:', validProjects.length);
    return validProjects;
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}

export function optimizeImage(imagePath: string, options: {
  width?: number;
  height?: number;
  quality?: number;
} = {}) {
  if (!imagePath) {
    console.error('No image path provided to optimizeImage');
    return '/placeholder.jpg'; // Add a placeholder image
  }

  // Make sure the path starts with a forward slash
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return normalizedPath;
} 