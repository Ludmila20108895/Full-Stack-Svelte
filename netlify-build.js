import { execSync } from 'child_process';

console.log(' Running svelte-kit build + headers');

execSync('npm run build', { stdio: 'inherit' });
