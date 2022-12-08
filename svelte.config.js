import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
			pages: 'public'
		}),
		alias: {
			$examples: './src/examples',
			'$examples/*': './src/examples/*'
		},
		paths: {
			base: process.env.VITE_BASE || ''
		},
		prerender: { entries: [] }
	}
};

export default config;
