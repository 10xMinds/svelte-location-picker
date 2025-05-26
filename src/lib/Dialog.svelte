<script lang="ts">
	import { click_outside, handle_escape, trap_focus } from '@kucrut/svelte-stuff/actions';
	import type { LatLngTuple } from 'leaflet';
	import type { Snippet } from 'svelte';
	import Popup from './Popup.svelte';

	interface Props {
		picked?: LatLngTuple | null;
		header?: Snippet;
		footer?: Snippet;
		trigger?: Snippet<[{ hide: () => void; show: () => void }]>;
		result?: Snippet<[{ selected: LatLngTuple | null }]>;
		oncancel?: (event: CustomEvent<{ picked: LatLngTuple | null }>) => void;
		onselect?: (event: CustomEvent<{ picked: LatLngTuple }>) => void;
		[key: string]: unknown;
	}

	let {
		picked = $bindable(null),
		header,
		footer,
		trigger,
		result,
		oncancel,
		onselect,
		...rest
	}: Props = $props();

	let dialog = $state<HTMLDialogElement | undefined>(undefined);
	let isOpen = $state(false);

	function hide() {
		if (dialog) {
			dialog.close();
			isOpen = false;
		}
	}

	function show() {
		if (dialog) {
			dialog.showModal(); // Changed from show() to showModal() for better modal behavior
			isOpen = true;
		}
	}

	function handleCancel(e: CustomEvent<{ picked: typeof picked }>) {
		// Modern event handling
		oncancel?.(e);
		hide();
	}

	function handleSelect(e: CustomEvent<{ picked: LatLngTuple }>) {
		({ picked } = e.detail);
		// Modern event handling
		onselect?.(e);
		hide();
	}
</script>

<dialog
	class="lp-dialog"
	bind:this={dialog}
	oncancel={() => hide()}
	onclose={() => hide()}
	use:click_outside={{ active: isOpen, callback: hide }}
	use:handle_escape={{ active: isOpen, callback: hide }}
	use:trap_focus
>
	{@render header?.()}
	<Popup {...rest} {picked} {isOpen} oncancel={handleCancel} onselect={handleSelect} />
	{@render footer?.()}
</dialog>

{@render trigger?.({ hide, show })}
{@render result?.({ selected: picked })}

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
