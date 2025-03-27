import { readdirSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get the directory parameter from the URL
  const { searchParams } = new URL(request.url);
  const dir = searchParams.get('dir');

  if (!dir) {
    return NextResponse.json({ images: [] });
  }

  const talkDir = join(process.cwd(), 'public', dir);
  try {
    const files = readdirSync(talkDir);
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        // Sort numerically by the number in the filename
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `${dir}/${file}`);

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return NextResponse.json({ images: [] });
  }
} 