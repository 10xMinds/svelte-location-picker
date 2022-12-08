<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import type { PageData } from './$types';
	import { toLatLng } from '$lib/utils';
	import Dialog from '$examples/dialog.svelte';
	import Modal from '$examples/modal.svelte';
	import Picker from '$lib/Picker.svelte';

	export let data: PageData;

	let picked_1: LatLngTuple | null;
	let picked_2: LatLngTuple | null;
	let result_1 = '';
	let result_2 = '';

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

	<pre><code
			>&lt;script&gt;
	import &#123;Picker&#125 from 'svelte-location-picker';

	let picked = null;
	let value = '';
&lt;/script&gt;

&lt;Picker &#123;picked&#125; on:pick=&#123;(e) =&gt; (value = e.detail.picked.join(', '))&#125; /&gt;

&lt;label class="wrapper"&gt;
	Picked Location:
	&lt;input type="text" bind:value /&gt;
&lt;/label&gt;
</code></pre>

	<div class="simple">
		<Picker picked={picked_1} on:pick={(e) => (result_1 = e.detail.picked.join(', '))} />
		<label class="wrapper">
			Picked Location:
			<input type="text" bind:value={result_1} />
		</label>
	</div>

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
