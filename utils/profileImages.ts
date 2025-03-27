import fs from 'fs';
import path from 'path';

export function getProfileImages() {
  const profileDir = path.join(process.cwd(), 'public/profile');
  try {
    const files = fs.readdirSync(profileDir);
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        // Sort numerically by the number in the filename
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `/profile/${file}`);
    
    return imageFiles;
  } catch (error) {
    console.error('Error reading profile directory:', error);
    return [];
  }
} 