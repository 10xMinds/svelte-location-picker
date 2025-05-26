<script lang="ts">
	import { Picker, toLatLng } from '$lib';
	import type { PickLocationEvent } from '$lib/types';
	import type { LatLngTuple } from 'leaflet';

	let picked: LatLngTuple | null = $state(null);
	let result = $state('');

	// Use $effect instead of run
	$effect(() => {
		try {
			if (result) {
				picked = toLatLng(result);
			}
		} catch (e) {
			picked = null;
		}
	});

	// Function to handle pick event
	function handlePick(e: CustomEvent<PickLocationEvent>) {
		result = e.detail.picked.join(', ');
	}
</script>

<div class="simple">
	<Picker {picked} onpick={handlePick} />
	<label class="wrapper">
		Picked Location:
		<input type="text" bind:value={result} />
	</label>
</div>
