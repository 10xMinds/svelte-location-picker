<script lang="ts">
	import Picker from '$lib/Picker.svelte';

	let example_1 = '';
</script>

<svelte:head>
	<title>Location Picker</title>
</svelte:head>

<h1>Location Picker</h1>

<div>
	<Picker on:pick={(e) => (example_1 = e.detail.picked.join(', '))} />
	<p>
		<input readonly type="text" value={example_1} />
	</p>
</div>

<style>
	input {
		width: 100%;
		font-variant-numeric: oldstyle-nums;
		letter-spacing: 0.025rem;
	}
</style>
