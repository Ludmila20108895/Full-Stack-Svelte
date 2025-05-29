import adapter from '@sveltejs/adapter-netlify';

export default {
	kit: {
		adapter: adapter(),
		files: {
			hooks: {
				server: 'src/hooks.server.ts'
			}
		}
	}
};
