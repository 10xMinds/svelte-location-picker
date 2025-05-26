<script lang="ts">
	import { Modal, toLatLng } from '$lib';
	import type { LatLngTuple } from 'leaflet';

	let picked: LatLngTuple | null = $state(null);
	let resultValue = $state('');

	function setResult(value: string) {
		resultValue = value;
		try {
			if (resultValue) {
				picked = toLatLng(resultValue);
			}
		} catch (e) {
			picked = null;
		}
	}

	function handleSelect(e: CustomEvent<{ picked: LatLngTuple }>) {
		setResult(e.detail.picked.join(','));
	}
</script>

<div class="has-dialog has-modal wrapper">
	<Modal {picked} onselect={handleSelect}>
		{#snippet result()}
			<input bind:value={resultValue} oninput={(e) => setResult(e.currentTarget.value)} />
		{/snippet}
		{#snippet trigger({ show })}
			<button
				onclick={(e) => {
					e.preventDefault();
					show();
				}}>Select Location</button
			>
		{/snippet}
	</Modal>
</div>
