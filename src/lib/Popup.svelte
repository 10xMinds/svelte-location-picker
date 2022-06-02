<script lang="ts">
	import type * as Leaflet from 'leaflet';
	import type { MapEvent, PickLocationEvent } from './types';
	import { createEventDispatcher } from 'svelte';
	import Picker from './Picker.svelte';

	export let isOpen = true;
	export let cancelText = 'Cancel';
	export let selectText = 'Select';
	export let picked: Leaflet.LatLngTuple | null = null;

	const dispatch = createEventDispatcher<{
		cancel: { picked: Leaflet.LatLngTuple | null };
		select: { picked: Leaflet.LatLngTuple };
	}>();
	let map: Leaflet.Map;

	$: selectedString = picked ? picked.join(',') : '';
	$: {
		if (isOpen && map) {
			map.invalidateSize();
		}
	}

	function handleCancel() {
		dispatch('cancel', { picked });
	}

	function handleMapReady(event: CustomEvent<MapEvent>) {
		map = event.detail.map;
	}

	function handlePick(e: CustomEvent<PickLocationEvent>) {
		({ picked } = e.detail);
	}

	function handleSelect() {
		if (picked) {
			dispatch('select', { picked });
		}
	}
</script>

<Picker {picked} {...$$restProps} on:pick={handlePick} on:ready={handleMapReady} />

<slot name="buttons" {handleCancel} {handleSelect} {picked}>
	<div class="lp-popup-buttons">
		<button
			class="lp-popup-button-select"
			disabled={picked === null}
			type="button"
			value={selectedString}
			on:click|preventDefault={handleSelect}
		>
			{selectText}
		</button>
		<button class="lp-popup-button-cancel" type="button" on:click|preventDefault={handleCancel}>
			{cancelText}
		</button>
	</div>
</slot>
