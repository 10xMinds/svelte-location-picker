<script lang="ts">
	import Dialog from '$examples/dialog.svelte';
	import Modal from '$examples/modal.svelte';
	import Simple from '$examples/simple.svelte';
	import CheckinCalendar from '$lib/CheckinCalendar.svelte';
	import Progress from '$lib/Progress.svelte';
	import Summary from '$lib/Summary.svelte';
	import Prism from 'svelte-prism';
	import type { PageData } from './$types';

	// Example data
	const checkedInDays = [
		new Date(2025, 4, 18), // May 18, 2025
		new Date(2025, 4, 19) // May 19, 2025
	];

	function handleDateSelect(date: any) {
		console.log('Selected date:', date);
		alert(`Selected date: ${date}`);
		// Handle check-in logic here
	}
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Svelte Location Picker</title>
</svelte:head>

<main>
	<h1>Svelte Location Picker</h1>

	<Summary
		caloriesConsumed={1383}
		caloriesRemaining={617}
		carbs={200}
		protein={120}
		fat={78}
		title="Log Food"
		icon="🍽️"
	/>

	<Progress value={617} max={1000} label="REMAINING" />
	<CheckinCalendar {checkedInDays} onDateSelect={handleDateSelect} />
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
