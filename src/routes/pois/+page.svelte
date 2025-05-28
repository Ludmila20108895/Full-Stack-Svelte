<script lang="ts">
	import PoiNavbar from '$lib/components/PoiNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';

	export let data: {
		user: {
			id: string;
			email: string;
		};
		pois: {
			_id: string;
			name: string;
			visitDate: string;
			category: string;
			latitude: number;
			longitude: number;
		}[];
	};

	const user = data.user;
	const pois = data.pois;

	const categories = [
		{ name: 'Caves', image: '/images/caves.png' },
		{ name: 'Mountains', image: '/images/mountains.png' },
		{ name: 'Cities', image: '/images/cities.png' },
		{ name: 'Beaches', image: '/images/beaches.png' },
		{ name: 'Parks', image: '/images/parks.png' },
		{ name: 'Waterfalls', image: '/images/waterfall.png' },
		{ name: 'Restaurants', image: '/images/restaurants.jpg' }
	];

	onMount(async () => {
		const L = await import('leaflet');

		const map = L.map('map').setView([53.35, -6.26], 6); // Ireland default

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		// Creates a markers from POIs with a "Visit" button
		const markers = data.pois
			.filter((p) => p.latitude && p.longitude)
			.map((p) =>
				L.marker([p.latitude, p.longitude]).bindPopup(`
        <div style="min-width: 160px;">
          <strong >${p.name}</strong><br>
          ${p.category}<br>
          Visited: ${p.visitDate}<br>
          <a class="button is-link is-small has-text-black mt-2" href="/added-places/${p._id}">
            Visit Place
          </a>
        </div>
      `)
			);

		if (markers.length) {
			const group = L.featureGroup(markers).addTo(map);
			map.fitBounds(group.getBounds());
		}

		// Chart
		const categoryNames = [
			'Caves',
			'Mountains',
			'Cities',
			'Beaches',
			'Parks',
			'Waterfalls',
			'Restaurants'
		];

		// Initialize category count
		const categoryCount: Record<string, number> = {};
		categoryNames.forEach((name) => (categoryCount[name] = 0));

		// Count actual POIs
		data.pois.forEach((poi) => {
			categoryCount[poi.category] = (categoryCount[poi.category] || 0) + 1;
		});

		const { Chart } = await import('frappe-charts');

		new Chart('#chart', {
			data: {
				labels: categoryNames,
				datasets: [{ name: 'POIs', values: categoryNames.map((name) => categoryCount[name]) }]
			},
			type: 'bar',
			height: 300,
			colors: ['#00d1b2']
		});
	});
</script>

<PoiNavbar />

<section class="section">
	<div class="container has-text-centered">
		<h1 class="title is-2 has-text-weight-bold has-text-primary">
			<span style="border-bottom: 5px solid #ffdd57; padding-bottom: 5px;">
				🌍 Discover Amazing Places
			</span>
		</h1>

		<p class="subtitle is-5 has-text-info mt-3">
			<strong>Explore and add your favorite Points of Interest!</strong>
		</p>

		<!-- Grid of category cards -->
		<div class="category-bar">
			{#each categories as category}
				<a href={`/pois/add?category=${category.name}`} class="category-card">
					<img src={category.image} alt={category.name} />
					<p>{category.name}</p>
				</a>
			{/each}
		</div>

		<!-- Map and Chart Row -->
		<div class="columns is-centered mt-6">
			<!-- Map Column -->
			<div class="column is-half">
				<h2 class="title is-3 has-text-weight-bold has-text-primary">🗺️ Map of Visited Places</h2>
				<div id="map"></div>
			</div>

			<!-- Chart Column -->
			<div class="column is-half">
				<h2 class="title is-3 has-text-weight-bold has-text-primary">📊 Category Chart</h2>
				<div id="chart"></div>
			</div>
		</div>
	</div>
</section>

<Footer />

<style>
	.category-bar {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		padding: 1rem 0;
		justify-content: center;
		scroll-snap-type: x mandatory;
	}

	.category-card {
		flex: 0 0 auto;
		width: 170px;
		height: 200px;
		text-align: center;
		background: rgb(255, 255, 255);
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease;
		scroll-snap-align: start;
		text-decoration: none;
		color: inherit;
	}

	.category-card img {
		width: 100%;
		height: 160px;
		object-fit: cover;
	}

	.category-card p {
		margin: 0.1rem 0;
		font-weight: bold;
		color: #2d65a1;
		font-size: 1.2rem;
	}
	.category-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
	}

	#map {
		height: 400px;
		width: 100%;
	}
</style>
