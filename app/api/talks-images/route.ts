import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dir = searchParams.get('dir') || '/talks';
    
    const talksDir = path.join(process.cwd(), 'public', dir);
    const files = fs.readdirSync(talksDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(file => `${dir}/${file}`);
    
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading talks images:', error);
    return NextResponse.json({ images: [] });
  }
} 