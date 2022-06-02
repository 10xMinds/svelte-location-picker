<script lang="ts">
	import type { LatLngTuple, LeafletMouseEvent, Marker } from 'leaflet';
	import type { MapEvent, PickLocationEvent } from './types';
	import { createEventDispatcher } from 'svelte';
	import MapBox from './MapBox.svelte';

	export let picked: LatLngTuple | null = null;

	let picked_marker: Marker;

	const dispatch = createEventDispatcher<{
		event: LeafletMouseEvent;
		pick: PickLocationEvent;
	}>();

	function init_map(event: CustomEvent<MapEvent>) {
		const { detail } = event;
		const { leaflet, map } = detail;

		if (picked) {
			picked_marker = leaflet.marker(picked).addTo(map);
		}

		map.on('click', (event: LeafletMouseEvent) => {
			if (picked_marker) {
				map.removeLayer(picked_marker);
			}

			const { latlng } = event;
			picked = [latlng.lat, latlng.lng];
			picked_marker = leaflet.marker(latlng).addTo(map);

			dispatch('pick', {
				event,
				picked
			});
		});
	}
</script>

<MapBox {...$$restProps} on:ready={init_map} />
