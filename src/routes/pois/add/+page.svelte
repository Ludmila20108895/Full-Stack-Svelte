<script lang="ts">
	import NavbarLoggedIn from '$lib/components/NavbarLoggedIn.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: {
		pois: {
			_id: string;
			name: string;
			visitDate: string;
			favourite: boolean;
		}[];
		category: string;
	};
	let scrollX: HTMLDivElement; // Reference to the scrollable container
</script>

<NavbarLoggedIn />

<section class="section">
	<div class="container">
		<h1 class="title is-2 has-text-weight-bold has-text-primary has-text-centered">
			🏙️ Add New Visited Place
		</h1>

		<div class="columns">
			<!-- Left Column: Add POI Form -->
			<div class="column is-half">
				<div class="box has-background-light p-5">
					<h2 class="title is-4 has-text-primary">Place Details</h2>

					<!-- Form to add a new place -->
					<form method="POST" action="?/add">
						<div class="field">
							<label class="label" for="name"
								><strong class="has-text-weight-bold">Place Name</strong></label
							>
							<div class="control">
								<input id="name" class="input" type="text" name="name" required />
							</div>
						</div>

						<div class="field">
							<label class="label" for="visitDate"
								><strong class="has-text-weight-bold">Date of Visit</strong></label
							>
							<div class="control">
								<input id="visitDate" type="date" name="visitDate" class="input" required />
							</div>
						</div>

						<div class="field">
							<label class="label" for="latitude"
								><strong class="has-text-weight-bold">Latitude</strong></label
							>
							<div class="control">
								<input
									id="latitude"
									class="input"
									type="number"
									step="any"
									name="latitude"
									required
								/>
							</div>
						</div>

						<div class="field">
							<label class="label" for="longitude"
								><strong class="has-text-weight-bold">Longitude</strong></label
							>
							<div class="control">
								<input
									id="longitude"
									class="input"
									type="number"
									step="any"
									name="longitude"
									required
								/>
							</div>
						</div>

						<input type="hidden" name="category" value={data.category} />

						<button class="button is-primary is-fullwidth">Add Place</button>
					</form>
				</div>
			</div>

			<!-- Right Column: Existing POIs -->
			<div class="column is-half">
				<div class="box has-background-light p-5">
					<h2 class="title is-4 has-text-primary">📍 Visited Places</h2>

					{#if data.pois.length > 0}
						<!-- Scrollable Container -->
						<div
							bind:this={scrollX}
							style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd;"
						>
							<table class="table is-fullwidth is-striped">
								<tbody>
									{#each data.pois as poi}
										<tr>
											<td><strong class="has-text-weight-bold">{poi.name}</strong></td>
											<td><strong class="has-text-weight-bold">{poi.visitDate}</strong></td>
											<td class="has-text-right has-text-weight-semibold">
												<!-- View Button -->
												<a
													class="button is-warning is-rounded mr-2"
													href={`/added-places/${poi._id}`}
													aria-label="View details"
												>
													<span class="icon"><i class="fa-solid fa-folder-open"></i> </span>
												</a>

												<!-- Delete -->
												<form method="POST" action="?/delete" style="display:inline;">
													<input type="hidden" name="id" value={poi._id} />
													<button
														class="button is-warning is-rounded mr-2"
														aria-label="Delete place"
													>
														<span class="icon"><i class="fas fa-trash"></i></span>
													</button>
												</form>

												<!-- Favourite -->

												<button
													class="button is-warning is-rounded"
													aria-label="Toggle favourite"
													on:click={async () => {
														const res = await fetch(`/api/pois/${poi._id}/favourite`, {
															method: 'POST'
														});
														if (res.ok) {
															const result = await res.json();
															poi.favourite = result.favourite; // Update the local state
														} else {
															alert('Failed to update favourite status.');
														}
													}}
												>
													<span class="icon">
														<i
															class={poi.favourite
																? 'fa-solid fa-heart has-text-danger'
																: 'fa-regular fa-heart'}
														></i>
													</span>
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{:else}
						<p class="has-text-grey-light">No places added yet.</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<Footer />
