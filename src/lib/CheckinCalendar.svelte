<script lang="ts">
	import { onMount } from 'svelte';

	// Props
	export let checkedInDays: Date[] = []; // Array of dates that have been checked in
	export let onDateSelect = (date: Date) => {}; // Callback when a date is selected

	// Local state
	let currentDate = new Date();
	let displayDates: Array<{
		date: Date;
		day: number;
		dayName: string;
		isToday: boolean;
		isCheckedIn: boolean;
		isPast: boolean;
		isFuture: boolean;
	}> = [];

	// Generate a week of dates starting from the beginning of the current week
	function generateWeekDates() {
		const today = new Date();
		const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

		// Adjust to make Monday the first day of the week (0 = Monday)
		const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

		// Calculate the Monday of this week
		const mondayDate = new Date(today);
		mondayDate.setDate(today.getDate() - adjustedDay);

		// Generate 7 days starting from Monday
		const weekDates = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(mondayDate);
			date.setDate(mondayDate.getDate() + i);

			const isToday = date.toDateString() === today.toDateString();
			const isCheckedIn = checkedInDays.some(
				(d) => new Date(d).toDateString() === date.toDateString()
			);

			weekDates.push({
				date,
				day: date.getDate(),
				dayName: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
				isToday,
				isCheckedIn,
				isPast: date < today && !isToday,
				isFuture: date > today && !isToday
			});
		}

		return weekDates;
	}

	onMount(() => {
		displayDates = generateWeekDates();
	});

	function handleDateClick(dateInfo: {
		date: any;
		day?: number;
		dayName?: string;
		isToday?: boolean;
		isCheckedIn?: boolean;
		isPast?: boolean;
		isFuture?: boolean;
	}) {
		onDateSelect(dateInfo.date);
	}
</script>

<div class="calendar-container">
	<div class="calendar-header">
		<div class="title">DAILY CHECK-IN</div>
		<div class="nav-arrow">›</div>
	</div>

	<div class="weekday-headers">
		{#each displayDates as dateInfo}
			<div class="day-name" class:today={dateInfo.isToday}>
				{dateInfo.dayName}
			</div>
		{/each}
	</div>

	<div class="dates-row">
		{#each displayDates as dateInfo}
			<button
				class="date-circle"
				class:checked={dateInfo.isCheckedIn}
				class:today={dateInfo.isToday}
				on:click={() => handleDateClick(dateInfo)}
			>
				{#if dateInfo.isCheckedIn}
					<div class="check-mark">✓</div>
				{:else}
					<div class="date-number">{dateInfo.day}</div>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.calendar-container {
		background-color: #121212;
		color: white;
		padding: 20px;
		font-family: Arial, sans-serif;
		border-radius: 10px;
		width: 100%;
		max-width: 600px;
	}

	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40px;
	}

	.title {
		font-size: 28px;
		font-weight: bold;
		letter-spacing: 1px;
	}

	.nav-arrow {
		font-size: 32px;
		cursor: pointer;
	}

	.weekday-headers {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
	}

	.day-name {
		flex: 1;
		text-align: center;
		color: #999;
		font-size: 18px;
		font-weight: bold;
	}

	.day-name.today {
		color: #d3e85a;
	}

	.dates-row {
		display: flex;
		justify-content: space-between;
	}

	.date-circle {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #333;
		cursor: pointer;
		font-size: 20px;
		font-weight: bold;
		position: relative;
	}

	.date-circle.today {
		background-color: #121212;
		border: 2px solid #d3e85a;
		box-sizing: border-box;
	}

	.date-circle.today::before {
		content: '';
		position: absolute;
		top: -35px;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 30px;
		background-color: #d3e85a;
		border-radius: 30px 30px 0 0;
		z-index: -1;
	}

	.date-circle.checked {
		background-color: #4caf50;
	}

	.check-mark {
		color: white;
		font-size: 28px;
	}

	.date-number {
		font-size: 22px;
	}
</style>
