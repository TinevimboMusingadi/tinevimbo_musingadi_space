import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllProjects() {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  const projectIds = fs.readdirSync(projectsDirectory);

  return projectIds.map(id => {
    const contentPath = path.join(projectsDirectory, id, 'content.md');
    let content = '';
    
    try {
      const fileContent = fs.readFileSync(contentPath, 'utf8');
      const { content: markdownContent } = matter(fileContent);
      content = markdownContent;
    } catch (error) {
      console.warn(`No content.md found for project ${id}`);
    }

    return {
      id,
      content
    };
  });
}

export function getProjectById(id: string) {
  const contentPath = path.join(process.cwd(), 'public/content/projects', id, 'content.md');
  let content = '';
  
  try {
    const fileContent = fs.readFileSync(contentPath, 'utf8');
    const { content: markdownContent } = matter(fileContent);
    content = markdownContent;
  } catch (error) {
    console.warn(`No content.md found for project ${id}`);
  }

  return {
    id,
    content
  };
} 