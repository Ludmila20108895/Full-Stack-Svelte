import adapter from '@sveltejs/adapter-netlify';
import sveltePreprocess from 'svelte-preprocess';

const config = {
	preprocess: sveltePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
// This SvelteKit configuration file uses the Netlify adapter for deployment
