// scripts/create-headers.js
import fs from 'fs';
import path from 'path';

const dir = path.resolve('.svelte-kit/output');
const file = path.join(dir, '_headers');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(file, `/*\n  X-Frame-Options: DENY\n`);
console.log('_headers file created successfully.');
