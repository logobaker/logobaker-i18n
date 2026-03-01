/**
 * Copies all locale JSON files into dist/locales/ as minified JSON.
 * Keeps the source locales/ pretty-printed for readability.
 */
import * as fs from 'fs';
import * as path from 'path';

const SRC_DIR = path.resolve(__dirname, '..', 'locales');
const DIST_DIR = path.resolve(__dirname, '..', 'dist', 'locales');

function copyMinified(srcDir: string, destDir: string): void {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyMinified(srcPath, destPath);
    } else if (entry.name.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
      fs.writeFileSync(destPath, JSON.stringify(content));
    }
  }
}

copyMinified(SRC_DIR, DIST_DIR);

const count = fs
  .readdirSync(SRC_DIR)
  .filter((f) => fs.statSync(path.join(SRC_DIR, f)).isDirectory()).length;

console.log(`✅ Minified locale JSONs copied to dist/locales/ (${count} locales)`);
