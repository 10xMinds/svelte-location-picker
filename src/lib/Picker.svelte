<script lang="ts">
	import type * as Leaflet from 'leaflet';
	import type { MapEvent, PickLocationEvent } from './types';
	import { beforeUpdate, createEventDispatcher } from 'svelte';
	import MapBox from './MapBox.svelte';

	export let picked: Leaflet.LatLngTuple | null = null;

	let leaflet: typeof Leaflet;
	let marker: Leaflet.Marker;
	let map: Leaflet.Map;

	const dispatch = createEventDispatcher<{
		pick: PickLocationEvent;
		ready: MapEvent;
	}>();

	function init_map(event: CustomEvent<MapEvent>) {
		const { detail } = event;
		({ leaflet, map } = detail);

		if (picked) {
			marker = leaflet.marker(picked).addTo(map);
		}

		map.on('click', (event: Leaflet.LeafletMouseEvent) => {
			if (marker) {
				map.removeLayer(marker);
			}

			const { latlng } = event;
			picked = [latlng.lat, latlng.lng];
			picked = [latlng.lat, latlng.lng];
			marker = leaflet.marker(latlng).addTo(map);

			dispatch('pick', { event, marker, picked });
		});

		dispatch('ready', detail);
	}

	beforeUpdate(() => {
		if (!leaflet) {
			return;
		}

		if (marker) {
			map.removeLayer(marker);
		}

		if (picked) {
			marker = leaflet.marker(picked).addTo(map);
		}
	});
</script>

<MapBox {...$$restProps} on:ready={init_map} />
