<script lang="ts">
	import { toLatLng } from '$lib';
	import { Modal } from '$lib/v4';
	import type { LatLngTuple } from 'leaflet';

	let picked: LatLngTuple | null = null;
	let result = '';

	$: {
		try {
			picked = toLatLng(result);
		} catch (e) {
			picked = null;
		}
	}
</script>

<div class="has-dialog has-modal wrapper">
	<Modal {picked} on:select={(e) => (result = e.detail.picked.join(','))}>
		<input slot="result" bind:value={result} />
		<button slot="trigger" let:show on:click|preventDefault={show}>Select Location</button>
	</Modal>
</div>
