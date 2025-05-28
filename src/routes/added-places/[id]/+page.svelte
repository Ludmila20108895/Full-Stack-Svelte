<script lang="ts">
	import NavbarLoggedIn from '$lib/components/NavbarLoggedIn.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: {
		poi: {
			_id: string;
			name: string;
			visitDate: string;
			category: string;
			latitude?: number;
			longitude?: number;
			images: string[];
		};
		weather?: {
			temperature: number;
			description: string;
			icon: string;
		};
	};

	const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	console.log('Loaded Google Maps Key:', VITE_GOOGLE_MAPS_API_KEY);
</script>

<NavbarLoggedIn />

<section class="section">
	<div class="container">
		<h1 class="title is-2 has-text-weight-bold has-text-primary has-text-centered">
			📍 {data.poi.name}
		</h1>

		<div class="columns">
			<!-- Left -->
			<div class="column is-half">
				<div class="box has-background-light p-5">
					<h2 class="title is-4 has-text-primary">Details</h2>
					<p><strong>Category:</strong> {data.poi.category}</p>
					<p><strong>Visited on:</strong> {data.poi.visitDate}</p>

					<hr />
					<h2 class="title is-5 has-text-primary">Upload Memory Pictures</h2>
					<form
						action={`/api/pois/${data.poi._id}/upload`}
						method="POST"
						enctype="multipart/form-data"
					>
						<div class="field">
							<label class="label" for="images">Choose images</label>
							<div class="control">
								<input type="file" id="images" name="images" multiple class="input" />
							</div>
						</div>
						<button type="submit" class="button is-primary is-fullwidth">Upload</button>
					</form>
				</div>
			</div>

			<!-- Right -->
			<div class="column is-half">
				<div class="box has-background-light p-5">
					<h2 class="title is-4 has-text-primary">Location</h2>

					{#if data.poi.latitude}
						<iframe
							title="Map showing POI location"
							width="100%"
							height="200"
							style="border: 0"
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							src={`https://www.google.com/maps/embed/v1/place?key=${VITE_GOOGLE_MAPS_API_KEY}&q=${data.poi.latitude},${data.poi.longitude}`}
							allowfullscreen
						></iframe>

						<p class="mt-3">
							<a
								href={`https://www.google.com/maps/search/?api=1&query=${data.poi.latitude},${data.poi.longitude}`}
								target="_blank"
								class="button is-primary is-fullwidth"
								aria-label="Open in Google Maps"
							>
								Open in Google Maps 🌍
							</a>
						</p>
					{:else}
						<p class="has-text-danger">No location data available.</p>
					{/if}

					{#if data.weather}
						<div class="notification is-info mt-4 weather-box is-fullwidth">
							<div class="weather-inline">
								<span>
									<strong>Current Weather:</strong>
									{data.weather.description} – {data.weather.temperature}°C
								</span>
								<img
									src={`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
									alt="Weather icon"
									style="width: 30px; height: 30px; margin-left: 8px;"
								/>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Image Gallery -->
		<div class="box mt-5">
			<h2 class="title is-4 has-text-primary">Photo Album</h2>
			{#if data.poi.images.length > 0}
				<div style="overflow-x: auto; white-space: nowrap; padding: 10px 0;">
					{#each data.poi.images as img}
						<div
							style="display:inline-block; margin-right:15px; width:150px; height:150px; position:relative;"
						>
							<a href={img} target="_blank" title="View Full Image">
								<img
									src={img}
									alt=""
									style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"
								/>
							</a>

							<form
								method="GET"
								action={`/api/pois/${data.poi._id}/images/${encodeURIComponent(img)}/delete`}
								style="position: absolute; bottom: 5px; right: 5px; margin: 0;"
							>
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									type="submit"
									class="button is-warning is-rounded is-small delete-button"
									title="Delete this image"
								>
									<span class="icon is-small"><i class="fas fa-trash"></i></span>
								</button>
							</form>
						</div>
					{/each}
				</div>
			{:else}
				<p class="has-text-grey-light">No images uploaded yet.</p>
			{/if}
		</div>

		<!-- Back Button -->
		<div class="has-text-centered mt-5">
			<a
				href={`/pois/add?category=${data.poi.category}`}
				class="button is-primary"
				aria-label="Back to My Places"
			>
				⬅ Back to My Places
			</a>
		</div>
	</div>
</section>

<Footer />

<style>
	.weather-box {
		max-width: 620px;
		margin: 0 auto;
		text-align: center;
		padding: 1rem;
	}

	.weather-inline {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-size: 1.1rem;
	}
</style>
