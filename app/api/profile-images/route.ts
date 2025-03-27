import { readdirSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const profileDir = join(process.cwd(), 'public/profile');
  try {
    const files = readdirSync(profileDir);
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        // Sort numerically by the number in the filename
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `/profile/${file}`);

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error('Error reading profile directory:', error);
    return NextResponse.json({ images: ['/profile/default.jpg'] });
  }
} 