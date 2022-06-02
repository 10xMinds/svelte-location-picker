<script lang="ts">
	import type * as Leaflet from 'leaflet';
	import type { MapEvent, PickLocationEvent } from './types';
	import { createEventDispatcher } from 'svelte';
	import Picker from './Picker.svelte';

	export let cancelText = 'Cancel';
	export let selectText = 'Select';
	export let picked: Leaflet.LatLngTuple | null = null;

	const dispatch = createEventDispatcher<{ select: { picked: Leaflet.LatLngTuple } }>();
	let dialog: HTMLDialogElement;
	let map: Leaflet.Map;

	$: selectedString = picked ? picked.join(',') : '';
	$: canSelect = selectedString !== '';

	function close() {
		dialog.close(selectedString);
	}

	function open() {
		dialog.show();
		map.invalidateSize();
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
			close();
		}
	}
</script>

<dialog class="lp-dialog" bind:this={dialog} on:close>
	<slot name="header" />
	<Picker {picked} {...$$restProps} on:pick={handlePick} on:ready={handleMapReady} />
	<div class="lp-dialog-buttons">
		<button
			class="lp-dialog-button-select"
			disabled={!canSelect}
			type="button"
			value={selectedString}
			on:click|preventDefault={handleSelect}
		>
			{selectText}
		</button>
		<button class="lp-dialog-button-cancel" type="button" on:click|preventDefault={close}>
			{cancelText}
		</button>
	</div>
</dialog>

<slot name="trigger" {open} />
<slot name="result" {selected} />

<style>
	dialog {
		z-index: 99999;
		padding: unset;
		width: 96vw;
		height: 90vh;
	}

	dialog[open] {
		display: flex;
		flex-direction: column;
	}

	dialog :global(.lp-map) {
		flex: 1;
	}
</style>
