<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import { toLatLng } from '$lib/utils';
	import Dialog from '$lib/Dialog.svelte';
	import Picker from '$lib/Picker.svelte';
	import Modal from '$lib/Modal.svelte';

	let picked_1: LatLngTuple | null;
	let picked_2: LatLngTuple | null;
	let picked_3: LatLngTuple | null;
	let result_1 = '';
	let result_2 = '';
	let result_3 = '';

	$: {
		try {
			picked_1 = toLatLng(result_1);
		} catch (e) {
			picked_1 = null;
		}
	}
	$: {
		try {
			picked_2 = toLatLng(result_2);
		} catch (e) {
			picked_2 = null;
		}
	}
	$: {
		try {
			picked_3 = toLatLng(result_3);
		} catch (e) {
			picked_3 = null;
		}
	}
</script>

<svelte:head>
	<title>Location Picker</title>
</svelte:head>

<h1>Location Picker</h1>

<h2>Simple Location Picker</h2>
<div class="simple">
	<Picker picked={picked_1} on:pick={(e) => (result_1 = e.detail.picked.join(', '))} />
	<label class="wrapper">
		Picked Location:
		<input type="text" bind:value={result_1} />
	</label>
</div>

<h2>Location Picker with &lt;dialog&gt;</h2>
<div class="has-dialog wrapper">
	<Dialog picked={picked_2} on:select={(e) => (result_2 = e.detail.picked.join(','))}>
		<input slot="result" bind:value={result_2} />
		<button slot="trigger" let:show on:click|preventDefault={show}>Select Location</button>
	</Dialog>
</div>

<h2>Location Picker with modal</h2>
<div class="has-dialog has-modal wrapper">
	<Modal picked={picked_3} on:select={(e) => (result_3 = e.detail.picked.join(','))}>
		<input slot="result" bind:value={result_3} />
		<button slot="trigger" let:show on:click|preventDefault={show}>Select Location</button>
	</Modal>
</div>

<style>
	div {
		position: relative;
		margin-block-end: 2rem;
	}

	input {
		font-variant-numeric: oldstyle-nums;
		letter-spacing: 0.025rem;
	}

	.wrapper {
		display: flex;
		margin-block: 1rem;
	}

	.wrapper input {
		flex: 1;
		margin-inline-start: 0.25rem;
	}

	.has-dialog :global(.lp-dialog-buttons) {
		padding: 0.5rem;
	}
</style>
