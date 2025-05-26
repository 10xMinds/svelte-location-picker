<script lang="ts">
	import type { LatLngTuple, Map as MapType, TileLayerOptions } from 'leaflet';
	import { onDestroy, onMount } from 'svelte';
	import type { MapEvent } from './types';

	interface Props {
		class?: string;
		center?: LatLngTuple;
		zoom?: number;
		tileLayerUrl?: string;
		tileLayerOptions?: TileLayerOptions;
		onready?: (event: CustomEvent<MapEvent>) => void;
	}

	let {
		class: cls = '',
		center = [-8.426466422648268, 116.40201458313763],
		zoom = 13,
		tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		tileLayerOptions = {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		},
		onready
	}: Props = $props();

	let mapEl = $state<HTMLDivElement | undefined>(undefined);
	let mapInstance: MapType | undefined = $state();

	onMount(async () => {
		const leaflet = await import('leaflet');
		if (!mapEl) return;
		mapInstance = leaflet.map(mapEl).setView(center, zoom);

		leaflet.tileLayer(tileLayerUrl, tileLayerOptions).addTo(mapInstance);

		// Use modern event handling
		const event = new CustomEvent('ready', {
			detail: { leaflet, map: mapInstance }
		});
		onready?.(event);
	});

	onDestroy(() => {
		if (mapInstance) {
			mapInstance.off();
			mapInstance.remove();
		}
	});
</script>

<div class={`lp-map ${cls}`} bind:this={mapEl}></div>

<style>
	.lp-map {
		height: var(--lp-map-height, 65vh);
		width: var(--lp-map-width, 100%);
	}
</style>
