import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'modules/views');

export function MdToString(fileName) {
  // Read markdown file as string
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return fileContents;
}