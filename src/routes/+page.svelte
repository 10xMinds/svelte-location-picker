<script lang="ts">
	import type { PageData } from './$types';
	import Dialog from '$examples/dialog.svelte';
	import Modal from '$examples/modal.svelte';
	import Simple from '$examples/simple.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Svelte Location Picker</title>
</svelte:head>

<main>
	<h1>Svelte Location Picker</h1>

	<p>
		Location Picker component for <a href="https://svelte.dev">Svelte</a> using
		<a href="https://leafletjs.com">Leaflet</a>.
	</p>

	<pre><code>npm install --save-dev @kucrut/svelte-location-picker</code></pre>

	<h2>Simple Location Picker</h2>

	{#if data.examples.simple}
		<pre><code>{data.examples.simple}</code></pre>
	{/if}

	<Simple />

	<h2>Location Picker with &lt;dialog&gt;</h2>

	{#if data.examples.dialog}
		<pre><code>{data.examples.dialog}</code></pre>
	{/if}

	<Dialog />

	<h2>Location Picker with modal</h2>

	{#if data.examples.modal}
		<pre><code>{data.examples.modal}</code></pre>
	{/if}

	<Modal />

	<p class="colophon"><a href="https://dz.aziz.im">💚</a></p>
</main>

<style>
	:global(body) {
		font-family: system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
			Cantarell, 'Helvetica Neue', sans-serif;
	}

	pre,
	code {
		font-family: Consolas, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
			'Lucida Sans Typewriter', 'Liberation Mono', 'Nimbus Mono L', 'Courier New', Courier,
			monospace;
	}

	main {
		max-width: 60rem;
		margin-inline: auto;
	}

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

	pre {
		background-color: #1c1c1c;
		padding: 1rem;
		line-height: 1.6;
	}

	pre code {
		color: #aec4d9;
	}

	.colophon {
		text-align: center;
		margin-block: 2rem;
	}

	.colophon a {
		text-decoration: unset;
		padding-inline: 0.5rem;
	}
</style>
