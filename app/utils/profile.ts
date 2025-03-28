import { readdirSync } from 'fs';
import { join } from 'path';

export function getProfileImages() {
  const profileDir = join(process.cwd(), 'public/profile');
  try {
    const files = readdirSync(profileDir);
    return files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `/profile/${file}`);
  } catch (error) {
    console.error('Error reading profile directory:', error);
    return ['/profile/default.jpg'];
  }
} 