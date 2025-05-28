<script lang="ts">
	export let data;
	import { onMount } from 'svelte';
	import NavbarLoggedIn from '$lib/components/NavbarLoggedIn.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const pois = data.pois;

	let selectedYear: string = '';
	let uniqueYears: string[] = [];
	let chartMonth: any; // Will hold chart instance

	// Extract year list and initialize charts
	onMount(async () => {
		const { Chart } = await import('frappe-charts');

		const yearSet = new Set<string>();
		const yearMap: Record<string, number> = {};

		pois.forEach((poi) => {
			const year = new Date(poi.visitDate).getFullYear().toString();
			yearSet.add(year);
			yearMap[year] = (yearMap[year] || 0) + 1;
		});

		uniqueYears = Array.from(yearSet).sort();
		selectedYear = uniqueYears.at(-1) || '';

		// Line Chart - Visits by Year
		new Chart('#chart-year', {
			title: 'Visits by Year',
			data: {
				labels: uniqueYears,
				datasets: [{ name: 'Visits', values: uniqueYears.map((y) => yearMap[y] || 0) }]
			},
			type: 'line',
			height: 300,
			colors: ['#209cee']
		});

		// Initial Pie Chart (most recent year)
		renderMonthChart(selectedYear);
	});

	// Render pie chart for selected year
	async function renderMonthChart(year: string) {
		const { Chart } = await import('frappe-charts');
		const monthlyCounts = Array(12).fill(0);

		pois.forEach((poi) => {
			const date = new Date(poi.visitDate);
			if (date.getFullYear().toString() === year) {
				monthlyCounts[date.getMonth()]++;
			}
		});

		if (chartMonth) chartMonth.destroy();

		chartMonth = new Chart('#chart-month', {
			title: `Visits by Month in ${year}`,
			data: {
				labels: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				],
				datasets: [{ name: 'Visits', values: monthlyCounts }]
			},
			type: 'percentage',
			height: 300,
			colors: ['#ff3860', '#ffdd57', '#23d160', '#209cee', '#9c27b0', '#ff9800']
		});
	}

	// Watch selectedYear change
	$: if (selectedYear) {
		renderMonthChart(selectedYear);
	}
</script>

<NavbarLoggedIn />

<section class="section">
	<div class="container">
		<h1 class="title has-text-primary">📊 Analytics Dashboard</h1>

		<!-- Line Chart -->
		<div class="box">
			<div id="chart-year"></div>
		</div>

		<!-- Year Filter + Dynamic Pie Chart -->
		<div class="box">
			<div class="field mb-4">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label">Select Year</label>
				<div class="control">
					<div class="select">
						<select bind:value={selectedYear}>
							{#each uniqueYears as year}
								<option value={year}>{year}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<div id="chart-month"></div>
		</div>
	</div>
</section>

<Footer />
