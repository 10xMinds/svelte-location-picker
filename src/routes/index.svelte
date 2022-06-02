<script lang="ts">
	import Dialog from '$lib/Dialog.svelte';
	import Picker from '$lib/Picker.svelte';

	let example_1 = '';
	let example_2 = '';
</script>

<svelte:head>
	<title>Location Picker</title>
</svelte:head>

<h1>Location Picker</h1>

<h2>Simple Location Picker</h2>
<div class="simple">
	<Picker on:pick={(e) => (example_1 = e.detail.picked.join(', '))} />
	<p>
		<output>{example_1 || '...'}</output>
	</p>
</div>

<h2>Location Picker with &lt;dialog&gt;</h2>
<div class="has-dialog">
	<Dialog
		picked={example_2 ? example_2.split(',').map(Number) : null}
		on:select={(e) => (example_2 = e.detail.picked.join(','))}
	>
		<input slot="result" bind:value={example_2} />
		<button slot="trigger" let:open on:click|preventDefault={open}>Select Location</button>
	</Dialog>
</div>

<style>
	div {
		position: relative;
		margin-block-end: 2rem;
	}

	.simple :global(.lp-map) {
		min-height: 35rem;
	}

	output {
		font-variant-numeric: oldstyle-nums;
		letter-spacing: 0.025rem;
	}

	.has-dialog {
		display: flex;
	}

	.has-dialog input {
		flex: 1;
		margin-inline-start: 0.25rem;
	}

	.has-dialog :global(.lp-dialog-buttons) {
		padding: 0.5rem;
	}

	:global(dialog) {
		position: fixed;
		top: 5vh;
	}
</style>
