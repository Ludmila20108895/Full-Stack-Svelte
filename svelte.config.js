import adapter from '@sveltejs/adapter-node';

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
