import fs from 'fs';
import path from 'path';

const dir = path.resolve('.svelte-kit/output');
const file = path.join(dir, '_headers');

// Ensure directory exists before writing
if (!fs.existsSync(dir)) {
	console.error(`Error: directory "${dir}" does not exist. Build output must be generated first.`);
	process.exit(1); // Exit with error to prevent silent failure
}

// Write headers
fs.writeFileSync(file, `/*\n  X-Frame-Options: DENY\n`);
console.log('_headers file created successfully.');
