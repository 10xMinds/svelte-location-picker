<script lang="ts">
	import { Picker, toLatLng } from '$lib';
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
