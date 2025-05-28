// This file initializes Firebase and exports the auth and GitHub provider instances

import fs from 'fs';
import path from 'path';

const dir = path.resolve('.svelte-kit/output');
const file = path.join(dir, '_headers');

// Ensure directory exists
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true });
}

// Write headers
fs.writeFileSync(file, `/*\n  X-Frame-Options: DENY\n`);
console.log('_headers file created successfully.');
// This script creates a _headers file in the .svelte-kit/output directory
