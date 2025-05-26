<script lang="ts">
	import type * as Leaflet from 'leaflet';
	import Picker from './Picker.svelte';
	import type { MapEvent, PickLocationEvent } from './types';

	interface Props {
		isOpen?: boolean;
		cancelText?: string;
		selectText?: string;
		picked?: Leaflet.LatLngTuple | null;
		buttons?: import('svelte').Snippet<
			[
				{
					handleCancel: () => void;
					handleSelect: () => void;
					picked: Leaflet.LatLngTuple | null;
				}
			]
		>;
		oncancel?: (event: CustomEvent<{ picked: Leaflet.LatLngTuple | null }>) => void;
		onselect?: (event: CustomEvent<{ picked: Leaflet.LatLngTuple }>) => void;
		[key: string]: unknown;
	}

	let {
		isOpen = true,
		cancelText = 'Cancel',
		selectText = 'Select',
		picked = $bindable(null),
		buttons,
		oncancel,
		onselect,
		...rest
	}: Props = $props();

	let map = $state<Leaflet.Map | undefined>(undefined);

	let selectedString = $derived(picked ? picked.join(',') : '');

	// In Svelte 5, $effect doesn't support options object as second parameter
	// We can use optional chaining to make the effect depend on isOpen
	$effect(() => {
		// This will only run when isOpen or map changes
		if (isOpen && map) {
			map.invalidateSize();
		}
	});

	function handleCancel() {
		// Use modern event dispatch approach
		const event = new CustomEvent('cancel', {
			detail: { picked }
		});
		oncancel?.(event);
	}

	function handleMapReady(event: CustomEvent<MapEvent>) {
		map = event.detail.map;
	}

	function handlePick(e: CustomEvent<PickLocationEvent>) {
		({ picked } = e.detail);
	}

	function handleSelect() {
		if (picked) {
			// Use modern event dispatch approach
			const event = new CustomEvent('select', {
				detail: { picked }
			});
			onselect?.(event);
		}
	}
</script>

<Picker {picked} {...rest} onpick={handlePick} onready={handleMapReady} />

{#if buttons}{@render buttons({ handleCancel, handleSelect, picked })}{:else}
	<div class="lp-popup-buttons">
		<button
			class="lp-popup-button-select"
			disabled={picked === null}
			type="button"
			value={selectedString}
			onclick={(e) => {
				e.preventDefault();
				handleSelect();
			}}
		>
			{selectText}
		</button>
		<button
			class="lp-popup-button-cancel"
			type="button"
			onclick={(e) => {
				e.preventDefault();
				handleCancel();
			}}
		>
			{cancelText}
		</button>
	</div>
{/if}
