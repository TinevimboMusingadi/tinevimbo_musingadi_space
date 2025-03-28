import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = await Promise.resolve(params.id);
    const contentPath = path.join(process.cwd(), 'public/content/projects', projectId, 'content.md');
    
    try {
      const fileContent = await fs.readFile(contentPath, 'utf8');
      const { content } = matter(fileContent);
      return NextResponse.json({ content });
    } catch (error) {
      console.warn(`No content.md found for project ${projectId}`);
      return NextResponse.json({ content: '' });
    }
  } catch (error) {
    console.error('Error reading project content:', error);
    return NextResponse.json({ error: 'Failed to read project content' }, { status: 500 });
  }
} 