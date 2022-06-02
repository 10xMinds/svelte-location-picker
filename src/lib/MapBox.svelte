<script lang="ts">
	import type { LatLngTuple, Map as MapType, TileLayerOptions } from 'leaflet';
	import type { MapEvent } from './types';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { browser } from '$app/env';

	let cls = '';
	export { cls as class };

	export let center: LatLngTuple = [-8.426466422648268, 116.40201458313763];
	export let zoom = 13;
	export let tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	export let tileLayerOptions: TileLayerOptions = {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	};

	let mapEl: HTMLDivElement;
	let mapInstance: MapType;
	const dispatch = createEventDispatcher<{ ready: MapEvent }>();

	onMount(async () => {
		if (!browser) {
			return;
		}

		const leaflet = await import('leaflet');
		mapInstance = leaflet.map(mapEl).setView(center, zoom);

		leaflet.tileLayer(tileLayerUrl, tileLayerOptions).addTo(mapInstance);

		dispatch('ready', { leaflet, map: mapInstance });
	});

	onDestroy(() => {
		if (mapInstance) {
			mapInstance.off();
			mapInstance.remove();
		}
	});
</script>

<div class={`lp-map ${cls}`} bind:this={mapEl} />

<style>
	.lp-map {
		height: var(--lp-map-height, 65vh);
		width: var(--lp-map-width, 100%);
	}
</style>
