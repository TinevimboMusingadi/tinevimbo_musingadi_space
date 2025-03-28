import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const projectsPath = path.join(process.cwd(), 'public/content/projects/projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    return NextResponse.json(projectsData);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
} 