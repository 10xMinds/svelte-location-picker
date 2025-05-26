<script lang="ts">
	import { toLatLng } from '$lib';
	import { Picker } from '$lib/v4';
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

<div class="simple">
	<Picker {picked} on:pick={(e) => (result = e.detail.picked.join(', '))} />
	<label class="wrapper">
		Picked Location:
		<input type="text" bind:value={result} />
	</label>
</div>
