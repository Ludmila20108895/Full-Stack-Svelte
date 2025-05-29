import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import fs from 'fs';
import path from 'path';

export default {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*']
		},
		// ⬇ Inject headers file BEFORE Netlify adapter runs
		files: {
			hooks: {
				handle: async ({ event, resolve }) => {
					const dir = path.resolve('.svelte-kit/output');
					const file = path.join(dir, '_headers');
					fs.mkdirSync(dir, { recursive: true });
					fs.writeFileSync(file, `/*\n  X-Frame-Options: DENY\n`);
					return resolve(event);
				}
			}
		}
	}
};
