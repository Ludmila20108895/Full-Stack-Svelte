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

	let currentImageIndex = 0;
	let lightboxIndex: number | null = null;

	function selectImage(index: number) {
		currentImageIndex = index;
	}

	function nextImage() {
		if (currentImageIndex < data.poi.images.length - 1) currentImageIndex++;
	}

	function prevImage() {
		if (currentImageIndex > 0) currentImageIndex--;
	}

	function openLightbox(index: number) {
		lightboxIndex = index;
		document.body.classList.add('modal-open');
	}

	function closeLightbox() {
		lightboxIndex = null;
		document.body.classList.remove('modal-open');
	}

	function nextInLightbox() {
		if (lightboxIndex !== null && lightboxIndex < data.poi.images.length - 1) {
			lightboxIndex++;
		}
	}

	function prevInLightbox() {
		if (lightboxIndex !== null && lightboxIndex > 0) {
			lightboxIndex--;
		}
	}

	function handleLightboxKey(event: KeyboardEvent) {
		if (event.key === 'Escape') closeLightbox();
		if (event.key === 'ArrowRight') nextInLightbox();
		if (event.key === 'ArrowLeft') prevInLightbox();
	}
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

		<!-- Photo Album -->
		<div class="box mt-5">
			<h2 class="title is-4 has-text-primary">Photo Album</h2>

			{#if data.poi.images.length > 0}
				<div style="display: flex; flex-wrap: wrap; gap: 20px;">
					{#each data.poi.images as img, index}
						<div style="position: relative; width: 150px;">
							<button
								type="button"
								on:click={() => openLightbox(index)}
								style="all: unset; display: block; cursor: zoom-in;"
								aria-label={`Open image ${index + 1}`}
							>
								<img
									src={img}
									alt={`Memory photo ${index + 1}`}
									style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;"
								/>
							</button>

							<!-- Delete -->
							<form
								method="GET"
								action={`/api/pois/${data.poi._id}/images/${encodeURIComponent(img)}/delete`}
								style="margin-top: 5px; text-align: right;"
							>
								<button
									type="submit"
									class="button is-warning is-rounded is-small"
									title="Delete this image"
									aria-label="Delete this image"
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

	<!-- Lightbox Modal -->
	{#if lightboxIndex !== null}
		<div
			class="lightbox"
			role="dialog"
			aria-modal="true"
			aria-label="Fullscreen image viewer"
			tabindex="0"
		>
			<div class="lightbox-content">
				<img
					src={data.poi.images[lightboxIndex]}
					alt={`Photo ${lightboxIndex + 1}`}
					class="lightbox-image"
				/>

				<div class="lightbox-controls">
					<button on:click={prevInLightbox} disabled={lightboxIndex === 0}>⬅ Prev</button>
					<button on:click={nextInLightbox} disabled={lightboxIndex === data.poi.images.length - 1}>
						Next ➡
					</button>
				</div>

				<button class="lightbox-close" on:click={closeLightbox} aria-label="Close modal">✖</button>
			</div>
		</div>
	{/if}
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

	.lightbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(10, 10, 10, 0.95);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.lightbox-content {
		position: relative;
		max-width: 100vw;
		max-height: 100vh;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		box-sizing: border-box;
	}

	.lightbox-image {
		max-width: 90vw;
		max-height: 90vh;
		display: block;
		margin: 0 auto;
		border-radius: 8px;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
		object-fit: contain;
	}

	.lightbox-close {
		position: absolute;
		top: 1rem;
		right: 1.5rem;
		background: none;
		border: none;
		font-size: 2rem;
		color: white;
		cursor: pointer;
	}

	.lightbox-controls {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
