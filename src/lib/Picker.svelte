<script lang="ts">
	import type * as Leaflet from 'leaflet';
	import MapBox from './MapBox.svelte';
	import type { MapEvent, PickLocationEvent } from './types';

	interface Props {
		picked?: Leaflet.LatLngTuple | null;
		onpick?: (event: CustomEvent<PickLocationEvent>) => void;
		onready?: (event: CustomEvent<MapEvent>) => void;
	}

	let { picked = $bindable(null), onpick, onready, ...rest }: Props = $props();

	let leaflet: typeof Leaflet | undefined = $state();
	let marker: Leaflet.Marker | undefined = $state();
	let map: Leaflet.Map | undefined = $state();

	// Replace beforeUpdate with $effect to handle marker updates when picked changes
	// Use an explicit dependency to avoid infinite loops
	let lastPickedValue: Leaflet.LatLngTuple | null = null;
	$effect(() => {
		if (!leaflet || !map) {
			return;
		}

		// Skip if picked hasn't actually changed (deep equality check)
		if (
			picked &&
			lastPickedValue &&
			picked[0] === lastPickedValue[0] &&
			picked[1] === lastPickedValue[1]
		) {
			return;
		}

		// Update our tracking variable
		lastPickedValue = picked;

		if (marker) {
			map.removeLayer(marker);
		}

		if (picked) {
			marker = leaflet.marker(picked).addTo(map);
		}
	});

	function init_map(event: CustomEvent<MapEvent>) {
		const { detail } = event;
		leaflet = detail.leaflet;
		map = detail.map;

		if (picked) {
			marker = leaflet.marker(picked).addTo(map);
		}

		map.on('click', (event: Leaflet.LeafletMouseEvent) => {
			if (marker && map) {
				map.removeLayer(marker);
			}

			const { latlng } = event;
			const newPicked: Leaflet.LatLngTuple = [latlng.lat, latlng.lng];

			// Update marker directly without triggering the effect unnecessarily
			marker = leaflet!.marker(latlng).addTo(map!);

			// Update lastPickedValue before changing picked to prevent double-processing
			lastPickedValue = newPicked;
			picked = newPicked;

			// Use modern event dispatch
			const pickEvent = new CustomEvent('pick', {
				detail: { event, marker, picked }
			});
			onpick?.(pickEvent);
		});

		// Use modern event dispatch for ready event
		const readyEvent = new CustomEvent('ready', {
			detail
		});
		onready?.(readyEvent);
	}
</script>

<MapBox {...rest} onready={init_map} />
