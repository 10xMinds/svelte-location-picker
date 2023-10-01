import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const components = import.meta.glob('../examples/*.svelte', { as: 'raw' });
	const modules = Object.entries(components).map(([path, func]) =>
		func().then((result) => ({
			name: (path.split('/').at(-1) || path).replace('.svelte', ''),
			source: result.replaceAll('$lib', '@kucrut/svelte-location-picker')
		}))
	);
	const sources = await Promise.all(modules);

	return {
		examples: Object.fromEntries(sources.map(({ name, source }) => [name, source]))
	};
};
