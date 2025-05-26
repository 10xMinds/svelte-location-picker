<script>
	import { onMount } from 'svelte';
	export let value = 617;
	export let max = 1000;
	export let label = 'REMAINING';

	// Calculate the percentage complete for the circle
	$: percentage = (value / max) * 100;
	$: dashOffset = 283 - (283 * percentage) / 100;

	// Size parameters
	const size = 200;
	const strokeWidth = 6;
	const radius = size / 2 - strokeWidth * 2;
	const circumference = radius * 2 * Math.PI;

	// Animation states
	let isVisible = false;
	let currentValue = 0;
	let animationComplete = false;

	onMount(() => {
		// Trigger the animation after a short delay
		setTimeout(() => {
			isVisible = true;
			animateValue();
		}, 300);
	});

	function animateValue() {
		const duration = 1500;
		const startTime = performance.now();

		/**
		 * @param {number} currentTime
		 */
		function updateValue(currentTime) {
			const elapsedTime = currentTime - startTime;
			const progress = Math.min(elapsedTime / duration, 1);

			// Use easeOutQuart easing function for smooth counting
			const easeProgress = 1 - Math.pow(1 - progress, 4);
			currentValue = Math.round(easeProgress * value);

			if (progress < 1) {
				requestAnimationFrame(updateValue);
			} else {
				animationComplete = true;
			}
		}

		requestAnimationFrame(updateValue);
	}
</script>

<div class="progress-container">
	<div class="progress-circle" class:visible={isVisible}>
		<!-- Background circle -->
		<svg width={size} height={size} viewBox="0 0 {size} {size}">
			<circle
				class="progress-background"
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke-width={strokeWidth}
			/>

			<!-- Progress circle -->
			<circle
				class="progress-indicator"
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke-width={strokeWidth + 2}
				stroke-dasharray={circumference}
				stroke-dashoffset={isVisible ? dashOffset : circumference}
				transform="rotate(-90, {size / 2}, {size / 2})"
			/>
		</svg>

		<!-- Content inside the circle -->
		<div class="progress-content">
			<div class="icon" class:visible={isVisible}>⚡</div>
			<div class="value" class:visible={isVisible}>
				{animationComplete ? value : currentValue}
			</div>
			<div class="label" class:visible={isVisible}>{label}</div>
		</div>
	</div>
</div>

<!-- SVG gradient definition -->
<svg width="0" height="0" style="position: absolute;">
	<defs>
		<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="#ffcc00" />
			<stop offset="100%" stop-color="#ff7700" />
		</linearGradient>
	</defs>
</svg>

<style>
	.progress-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.progress-circle {
		position: relative;
		width: 100%;
		max-width: 200px;
		aspect-ratio: 1;
		opacity: 0;
		transform: scale(0.8);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.progress-circle.visible {
		opacity: 1;
		transform: scale(1);
	}

	svg {
		width: 100%;
		height: 100%;
	}

	.progress-background {
		fill: rgba(30, 30, 35, 0.7);
		stroke: rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.progress-indicator {
		fill: transparent;
		stroke: url(#gradient);
		transition: stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
		filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.6));
	}

	.progress-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.icon {
		color: #ffcc00;
		font-size: 1.2rem;
		margin-bottom: 0.2rem;
		filter: drop-shadow(0 0 5px rgba(255, 204, 0, 0.7));
		opacity: 0;
		transform: translateY(-20px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
	}

	.icon.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.value {
		color: white;
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1;
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 0.6s ease 0.3s,
			transform 0.6s ease 0.3s;
	}

	.value.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.label {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-top: 0.2rem;
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 0.6s ease 0.5s,
			transform 0.6s ease 0.5s;
	}

	.label.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
