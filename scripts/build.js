import { execSync } from 'child_process';

try {
	console.log(' Running: svelte-kit build');
	execSync('npx svelte-kit build', { stdio: 'inherit' });
	console.log(' Build finished.');
} catch (error) {
	console.error(' Build failed:', error.message);
	process.exit(1);
}
