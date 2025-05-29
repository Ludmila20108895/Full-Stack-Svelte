import { build } from '@sveltejs/kit/cli';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
	process.chdir(resolve(__dirname, '..'));
	await build();
	console.log('SvelteKit build complete');
} catch (e) {
	console.error('Build failed:', e);
	process.exit(1);
}
