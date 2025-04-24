import { readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';

async function findAndDeleteFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await findAndDeleteFiles(fullPath);
      } else if (entry.name.match(/-generator-.*\.tsx$/)) {
        console.log(`Deleting: ${fullPath}`);
        await unlink(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

// Start from the current directory
findAndDeleteFiles('.');