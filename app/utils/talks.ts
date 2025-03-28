import { readdirSync } from 'fs';
import { join } from 'path';

export function getTalkImages(dir: string) {
  const talkDir = join(process.cwd(), 'public', dir);
  try {
    const files = readdirSync(talkDir);
    return files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `${dir}/${file}`);
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
} 