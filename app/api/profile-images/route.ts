import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const profileDir = path.join(process.cwd(), 'public/profile');
    const files = fs.readdirSync(profileDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `/profile/${file}`);
    
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading profile images:', error);
    return NextResponse.json({ images: ['/profile/default.jpg'] });
  }
} 