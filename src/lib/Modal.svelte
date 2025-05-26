<script lang="ts">
	import { click_outside, handle_escape, trap_focus } from '@kucrut/svelte-stuff/actions';
	import type { LatLngTuple } from 'leaflet';
	import Popup from './Popup.svelte';

	interface Props {
		picked?: LatLngTuple | null;
		closeOnClickBg?: boolean;
		isOpen?: boolean;
		header?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		trigger?: import('svelte').Snippet<
			[
				| { hide: () => void; show: () => void }
				| { hide: () => void; show: () => void }
				| (() => void)
			]
		>;
		result?: import('svelte').Snippet<
			[{ selected: LatLngTuple | null } | { selected: LatLngTuple | null } | (() => void)]
		>;
		oncancel?: (event: CustomEvent<{ picked: LatLngTuple | null }>) => void;
		onselect?: (event: CustomEvent<{ picked: LatLngTuple }>) => void;
		[key: string]: unknown;
	}

	let {
		picked = $bindable(null),
		closeOnClickBg = true,
		isOpen = $bindable(false),
		header,
		footer,
		trigger,
		result,
		oncancel,
		onselect,
		...rest
	}: Props = $props();

	function hide() {
		isOpen = false;
	}

	function show() {
		isOpen = true;
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

<div class="lp-modal" class:lp-modal--is-open={isOpen} hidden={!isOpen}>
	<div
		class="lp-modal-content"
		tabindex="-1"
		use:click_outside={{ active: closeOnClickBg && isOpen, callback: hide }}
		use:handle_escape={{ callback: hide }}
		use:trap_focus
	>
		{@render header?.()}
		<Popup {...rest} {isOpen} {picked} oncancel={handleCancel} onselect={handleSelect} />
		{@render footer?.()}
	</div>
</div>

{@render trigger?.({ hide, show })}
{@render result?.({ selected: picked })}

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
