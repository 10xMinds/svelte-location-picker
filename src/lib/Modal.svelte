<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Popup from './Popup.svelte';

	export let closeOnClickBg = true;
	export let isOpen = false;

	const dispatch = createEventDispatcher();
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

	function handleSelectCancel(e: CustomEvent) {
		dispatch(e.type, e.detail);
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
		<Popup
			{...$$restProps}
			{isOpen}
			on:cancel={handleSelectCancel}
			on:select={handleSelectCancel}
		/>
	</div>
</div>

<slot name="trigger" {hide} {show} />
<slot name="result" />

<style>
	.lp-modal {
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--lp-modal-z-index, 99999);
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: var(--lp-modal-background-color, rgba(0, 0, 0, 0.75));
	}

	.lp-modal:not([hidden]) {
		display: grid;
		place-items: center;
	}

	.lp-modal-content {
		--lp-map-width: 100%;

		width: var(--lp-modal-content-width, 80%);
		background-color: var(--lp-modal-content-background-color, #fefefe);
	}
</style>
