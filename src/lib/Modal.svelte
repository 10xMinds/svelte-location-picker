<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import { createEventDispatcher } from 'svelte';
	import Popup from './Popup.svelte';

	export let picked: LatLngTuple | null = null;
	export let closeOnClickBg = true;
	export let isOpen = false;

	const dispatch = createEventDispatcher<{
		cancel: { picked: LatLngTuple | null };
		select: { picked: LatLngTuple };
	}>();
	let modalEl: HTMLDivElement;

	function hide() {
		isOpen = false;
	}

	function show() {
		isOpen = true;
	}

	function handleClickBg(event: Event) {
		if (closeOnClickBg && event.target === modalEl) {
			hide();
		}
	}

	function handleCancel(e: CustomEvent<{ picked: typeof picked }>) {
		dispatch('cancel', e.detail);
		hide();
	}

	function handleSelect(e: CustomEvent<{ picked: LatLngTuple }>) {
		({ picked } = e.detail);
		dispatch('select', e.detail);
		hide();
	}
</script>

<div
	class="lp-modal"
	class:lp-modal--is-open={isOpen}
	hidden={!isOpen}
	bind:this={modalEl}
	on:click|capture={handleClickBg}
>
	<div class="lp-modal-content">
		<slot name="header" />
		<Popup {...$$restProps} {isOpen} {picked} on:cancel={handleCancel} on:select={handleSelect} />
		<slot name="footer" />
	</div>
</div>

<slot name="trigger" {hide} {show} />
<slot name="result" selected={picked} />

<style>
	.lp-modal {
		--lp-map-width: 100%;

		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--lp-modal-z-index, 99999);
		width: 100%;
		height: 100%;
		background-color: var(--lp-modal-background-color, rgba(0, 0, 0, 0.75));
	}

	.lp-modal:not([hidden]) {
		display: grid;
		place-items: center;
	}

	.lp-modal-content {
		width: var(--lp-modal-content-width, 80%);
		background-color: var(--lp-modal-content-background-color, #fefefe);
	}
</style>
