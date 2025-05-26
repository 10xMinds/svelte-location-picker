<script context="module">
	function getProgressColor(progress) {
		// Custom gradient based on progress
		if (progress < 0.33) {
			return '#FFD700'; // Gold/yellow
		} else if (progress < 0.66) {
			return '#FFA500'; // Orange
		} else {
			return '#FF4500'; // Red-orange
		}
	}
</script>

<script lang="ts">
	// Props
	export let caloriesConsumed = 1383;
	export let caloriesRemaining = 617;
	export let carbs = 200;
	export let protein = 120;
	export let fat = 78;
	export let title = 'Log Food';
	export let icon = '🍴'; // Default icon if SVG not provided

	// Calculate total calories
	$: totalCalories = caloriesConsumed + caloriesRemaining;

	// Calculate progress for the circle (0 to 1)
	$: progress = caloriesConsumed / totalCalories;

	// Calculate the circle's dash offset based on progress
	$: dashOffset = (1 - progress) * 283; // 283 is approx circumference of circle with r=45

	// Calculate gradients for the progress bar
	$: progressColor = getProgressColor(progress);
</script>

<div class="summary-card">
	<div class="header">
		<div class="icon-container">
			<span class="icon">{icon}</span>
		</div>
		<h2 class="title">{title}</h2>
	</div>

	<div class="content">
		<div class="calories-consumed">
			<span class="calories-value">{caloriesConsumed}</span>
			<span class="calories-unit">kcal</span>
			<div class="consumed-label">CONSUMED</div>
		</div>

		<div class="progress-circle-container">
			<svg class="progress-circle" width="120" height="120" viewBox="0 0 120 120">
				<!-- Background circle -->
				<circle cx="60" cy="60" r="45" fill="#222" stroke="#333" stroke-width="5" />

				<!-- Progress arc -->
				<circle
					cx="60"
					cy="60"
					r="45"
					fill="transparent"
					stroke-dasharray="283"
					stroke-dashoffset={dashOffset}
					stroke-width="5"
					stroke={progressColor}
					transform="rotate(-90, 60, 60)"
					class="progress-arc"
				/>

				<!-- Lightning bolt icon -->
				<text x="60" y="50" text-anchor="middle" class="lightning-bolt">⚡</text>

				<!-- Remaining calories -->
				<text x="60" y="70" text-anchor="middle" class="remaining-value"
					>{caloriesRemaining}</text
				>
				<text x="60" y="90" text-anchor="middle" class="remaining-label">REMAINING</text>
			</svg>
		</div>
	</div>

	<div class="macros">
		<div class="macro carbs">
			<div class="macro-indicator"></div>
			<div class="macro-label">Carbs</div>
			<div class="macro-value">{carbs}</div>
		</div>

		<div class="macro protein">
			<div class="macro-indicator"></div>
			<div class="macro-label">Protein</div>
			<div class="macro-value">{protein}</div>
		</div>

		<div class="macro fat">
			<div class="macro-indicator"></div>
			<div class="macro-label">Fat</div>
			<div class="macro-value">{fat}</div>
		</div>
	</div>
</div>

<style>
	.summary-card {
		background-color: #121212;
		border-radius: 24px;
		padding: 24px;
		color: white;
		font-family: Arial, sans-serif;
		max-width: 600px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
		border: 1px solid #333;
		position: relative;
		overflow: hidden;
	}

	.header {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.icon-container {
		width: 60px;
		height: 60px;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15px;
	}

	.icon {
		font-size: 30px;
		opacity: 0.9;
	}

	.title {
		font-size: 32px;
		font-weight: 500;
		color: #aaa;
		margin: 0;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40px;
	}

	.calories-consumed {
		flex: 1;
	}

	.calories-value {
		font-size: 60px;
		font-weight: 700;
		line-height: 1;
	}

	.calories-unit {
		font-size: 40px;
		font-weight: 300;
		margin-left: 8px;
	}

	.consumed-label {
		font-size: 20px;
		color: #999;
		margin-top: 5px;
		letter-spacing: 1px;
	}

	.progress-circle-container {
		position: relative;
		width: 120px;
		height: 120px;
	}

	.progress-circle {
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
	}

	.progress-arc {
		transition: stroke-dashoffset 0.5s ease;
		filter: drop-shadow(0 0 5px currentColor);
	}

	.lightning-bolt {
		font-size: 20px;
		fill: #ffd700;
		transform: rotate(90deg);
		transform-origin: 60px 60px;
		text-shadow: 0 0 10px #ffd700;
		font-family: 'Arial', sans-serif;
	}

	.remaining-value {
		font-size: 28px;
		font-weight: 700;
		fill: white;
		transform: rotate(90deg);
		transform-origin: 60px 60px;
	}

	.remaining-label {
		font-size: 12px;
		fill: #999;
		transform: rotate(90deg);
		transform-origin: 60px 60px;
		letter-spacing: 1px;
	}

	.macros {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
	}

	.macro {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.macro-indicator {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		margin-bottom: 8px;
	}

	.carbs .macro-indicator {
		background-color: #ff4444;
	}

	.protein .macro-indicator {
		background-color: #ffa500;
	}

	.fat .macro-indicator {
		background-color: #4b9eff;
	}

	.macro-label {
		font-size: 18px;
		color: #999;
		margin-bottom: 5px;
	}

	.macro-value {
		font-size: 36px;
		font-weight: 700;
	}
</style>
