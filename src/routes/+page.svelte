<script lang="ts">
	import type { PageData } from './$types';
	import Dialog from '$examples/dialog.svelte';
	import Modal from '$examples/modal.svelte';
	import Prism from 'svelte-prism';
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

	<Prism language="none" source="npm install --save-dev @kucrut/svelte-location-picker" />

	<h2>Simple Location Picker</h2>

	{#if data.examples.simple}
		<Prism language="svelte" source={data.examples.simple} />
	{/if}

	<Simple />

	<h2>Location Picker with &lt;dialog&gt;</h2>

	{#if data.examples.dialog}
		<Prism language="svelte" source={data.examples.dialog} />
	{/if}

	<Dialog />

	<h2>Location Picker with modal</h2>

	{#if data.examples.modal}
		<Prism language="svelte" source={data.examples.modal} />
	{/if}

	<Modal />

	<p class="colophon"><a href="https://dz.aziz.im">💚</a></p>
</main>
