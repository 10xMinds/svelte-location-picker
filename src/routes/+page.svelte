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
