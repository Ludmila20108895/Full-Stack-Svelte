<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: { message?: string };
	const message = data.message;
</script>

<Navbar />

<section class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-6">
				<h1 class="title">Sign up</h1>
				{#if message}
					<div class="notification is-danger">{message}</div>
				{/if}

				<!-- You can add error display here -->

				<form method="POST" action="/signup">
					<!-- Name Fields -->
					<div class="field">
						<label class="label" for="firstName">Name</label>
						<div class="field-body">
							<div class="field">
								<input
									id="firstName"
									class="input"
									type="text"
									name="firstName"
									placeholder="Enter first name"
									required
								/>
							</div>
							<div class="field">
								<input
									id="lastName"
									class="input"
									type="text"
									name="lastName"
									placeholder="Enter last name"
									required
								/>
							</div>
						</div>
					</div>

					<!-- Email -->
					<div class="field">
						<label class="label" for="email">Email</label>
						<input
							id="email"
							class="input"
							type="email"
							name="email"
							placeholder="Enter email"
							required
						/>
					</div>

					<!-- Password -->
					<div class="field">
						<label class="label" for="password">Password</label>
						<input
							id="password"
							class="input"
							type="password"
							name="password"
							placeholder="Enter password"
							required
						/>
					</div>

					<button class="button is-warning is-fullwidth">Sign Up</button>
				</form>
			</div>
		</div>
	</div>
</section>

<Footer />
