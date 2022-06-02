<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import type { MapEvent } from './types';
	import { createEventDispatcher, onMount } from 'svelte';
	import { browser } from '$app/env';

	let cls = '';
	export { cls as class };

	export let center: LatLngTuple = [-8.426466422648268, 116.40201458313763];
	export let zoom = 13;
	export let tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	export let tileLayerOptions = {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	};

	let mapEl: HTMLDivElement;
	const dispatch = createEventDispatcher<{ ready: MapEvent }>();

	onMount(async () => {
		if (!browser) {
			return;
		}

		const leaflet = await import('leaflet');
		const map = leaflet.map(mapEl).setView(center, zoom);

		leaflet.tileLayer(tileLayerUrl, tileLayerOptions).addTo(map);

		dispatch('ready', { leaflet, map });
	});
</script>

<div class={`lp-map ${cls}`} bind:this={mapEl} />
