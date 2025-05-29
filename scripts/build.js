// scripts/build.js
import { build } from '@sveltejs/kit/cli';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
	console.log(' Changing to project root...');
	process.chdir(resolve(__dirname, '..'));

	console.log(' Starting SvelteKit build...');
	await build();

	console.log(' SvelteKit build completed.');
} catch (err) {
	console.error(' Build error:', err);
	process.exit(1);
}
