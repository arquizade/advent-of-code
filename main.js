import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const day = process.argv[2];
const code = process.argv[3];

if (!day || !code) {
  console.error('Please specify both day and code file to run.');
  process.exit(1);
}

const filePath = path.join(__dirname, '2024', day, `${code}.js`);

if (fs.existsSync(filePath)) {
  try {
    await import(filePath);
  } catch (error) {
    console.error(`Error importing the file: ${error.message}`);
    process.exit(1);
  }
} else {
  console.error(`The specified file for ${day} does not exist.`);
  process.exit(1);
}
