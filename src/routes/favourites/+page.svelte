<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import NavbarLoggedIn from '$lib/components/NavbarLoggedIn.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: {
		favourites: {
			_id: string;
			name: string;
			visitDate: string;
			latitude: number;
			longitude: number;
			category: string;
		}[];
	};

	let mapDiv: HTMLDivElement;

	onMount(async () => {
		if (!mapDiv) return;

		const L = await import('leaflet');

		// Fix for missing marker icons in SvelteKit/Vite
		delete (L.Icon.Default.prototype as any)._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
			iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
			shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
		});

		const map = L.map(mapDiv).setView([53.35, -6.26], 6);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		const markers = data.favourites
			.filter((poi) => poi.latitude && poi.longitude)
			.map((poi) =>
				L.marker([poi.latitude, poi.longitude]).bindPopup(`
						<strong>${poi.name}</strong><br>
						${poi.category}<br>
						Visited: ${poi.visitDate}<br>
						<a href="/added-places/${poi._id}" class="button is-link is-small has-text-black mt-2">Visit</a>
					`)
			);

		if (markers.length) {
			const group = L.featureGroup(markers).addTo(map);
			map.fitBounds(group.getBounds());
		}
	});
</script>

<NavbarLoggedIn />

<section class="section">
	<div class="container">
		<h1 class="title is-2 has-text-weight-bold has-text-primary has-text-centered">
			❤️ My Favourite Places
		</h1>

		<div class="columns">
			<!-- Left Column: Map -->
			<div class="column is-half">
				<div class="box has-background-light p-5">
					<h2 class="title is-4 has-text-primary">🗺️ Location on Map</h2>
					<div bind:this={mapDiv} style="height: 400px;"></div>
				</div>
			</div>

			<!-- Right Column: Favourites List -->
			<div class="column is-half">
				<div class="box has-background-light p-5">
					<h2 class="title is-4 has-text-primary">📍 Favourite Places</h2>

					{#if data.favourites.length > 0}
						<div style="max-height: 400px; overflow-y: auto;">
							<table class="table is-fullwidth is-striped">
								<tbody>
									{#each data.favourites as poi}
										<tr>
											<td><strong>{poi.name}</strong></td>
											<td><strong>{poi.visitDate}</strong></td>
											<td class="has-text-right">
												<!-- View -->
												<a
													href={`/added-places/${poi._id}`}
													class="button is-warning is-rounded mr-2"
													title="View Details"
													aria-label="View Details"
												>
													<span class="icon"><i class="fa-solid fa-folder-open"></i></span>
												</a>

												<!-- Unfavourite -->
												<form
													method="POST"
													action={`/api/pois/${poi._id}/favourite`}
													style="display:inline;"
												></form>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{:else}
						<p class="has-text-grey-light">You haven't added any favourites yet.</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<Footer />
