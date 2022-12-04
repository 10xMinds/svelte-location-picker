<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import { click_outside, handle_escape } from '@kucrut/svelte-stuff/actions';
	import { createEventDispatcher } from 'svelte';
	import Popup from './Popup.svelte';

	export let picked: LatLngTuple | null = null;

	const dispatch = createEventDispatcher<{
		cancel: { picked: LatLngTuple | null };
		select: { picked: LatLngTuple };
	}>();
	let dialog: HTMLDialogElement;
	let isOpen = false;

	function hide() {
		dialog.close();
		isOpen = false;
	}

	function show() {
		dialog.show();
		isOpen = true;
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

<dialog
	class="lp-dialog"
	bind:this={dialog}
	on:cancel
	on:close
	use:click_outside={{ active: isOpen, callback: hide }}
	use:handle_escape={{ callback: hide }}
>
	<slot name="header" />
	<Popup {...$$restProps} {picked} {isOpen} on:cancel={handleCancel} on:select={handleSelect} />
	<slot name="footer" />
</dialog>

<slot name="trigger" {hide} {show} />
<slot name="result" selected={picked} />

<style>
	dialog {
		--lp-map-width: 100%;

		position: var(--lp-dialog-position, fixed);
		z-index: var(--lp-dialog-z-index, 99999);
		left: var(--lp-dialog-left, 50%);
		top: var(--lp-dialog-top, 50%);
		transform: var(--lp-dialog-transform, translate(-50%, -50%));
		padding: var(--lp-dialog-padding, unset);
		width: var(--lp-dialog-width, 80%);
	}
</style>
