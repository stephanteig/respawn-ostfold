// Sorts files dropped into /public/uploads into their destination folders.
//   players.json            -> /public/data/players.json
//   filename contains "kred" -> /public/images/sponsors/
//   filename contains "logo" -> /public/images/
//   other image files        -> /public/images/
// Non-image files are skipped with a warning. Run: node scripts/sort-uploads.js
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const UPLOADS = path.join(ROOT, 'public', 'uploads');
const IMAGES = path.join(ROOT, 'public', 'images');
const SPONSORS = path.join(IMAGES, 'sponsors');
const DATA = path.join(ROOT, 'public', 'data');

const SKIP = new Set(['.gitkeep', 'README.md']);
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function resolveCollision(destDir, filename) {
  let target = path.join(destDir, filename);
  if (!fs.existsSync(target)) return target;
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  target = path.join(destDir, `${base}-copy${ext}`);
  return target;
}

function main() {
  if (!fs.existsSync(UPLOADS)) {
    console.log('No files to sort');
    return;
  }

  const entries = fs
    .readdirSync(UPLOADS)
    .filter((name) => !SKIP.has(name))
    .filter((name) => fs.statSync(path.join(UPLOADS, name)).isFile());

  if (entries.length === 0) {
    console.log('No files to sort');
    return;
  }

  for (const filename of entries) {
    const src = path.join(UPLOADS, filename);
    const lower = filename.toLowerCase();
    const ext = path.extname(lower);

    let destDir;
    if (lower === 'players.json') {
      destDir = DATA;
    } else if (!IMAGE_EXTS.has(ext)) {
      console.warn(`Warning: skipped non-image file: ${filename}`);
      continue;
    } else if (lower.includes('kred')) {
      destDir = SPONSORS;
    } else {
      // "logo" and all other images go to /public/images
      destDir = IMAGES;
    }

    ensureDir(destDir);
    const dest = resolveCollision(destDir, filename);
    fs.renameSync(src, dest);
    console.log(`Moved: ${filename} → ${path.relative(ROOT, dest)}`);
  }
}

main();
