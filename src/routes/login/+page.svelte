<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { signInWithPopup } from 'firebase/auth';
	import { auth, githubProvider, googleProvider } from '$lib/firebase';

	export let data: { message?: string };
	const message = data.message;

	async function loginWithGitHub() {
		try {
			const result = await signInWithPopup(auth, githubProvider);
			const user = result.user;

			console.log(' Firebase login success:', user.email);

			const res = await fetch('/api/auth/save-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					uid: user.uid,
					email: user.email,
					name: user.displayName || 'Anonymous'
				})
			});

			if (!res.ok) {
				console.error('Failed to save user:', await res.text());
				alert('Failed to log in');
				return;
			}

			window.location.href = '/pois'; // Redirect to the protected page after successful login
		} catch (err) {
			console.error('Firebase GitHub login failed:', err);
			alert('Login failed. Please try again.');
		}
	}
	async function loginWithGoogle() {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const user = result.user;

			console.log('Google login success:', user.email);

			const res = await fetch('/api/auth/save-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					uid: user.uid,
					email: user.email,
					name: user.displayName || 'Anonymous'
				})
			});

			if (!res.ok) {
				console.error('Failed to save user:', await res.text());
				alert('Failed to log in');
				return;
			}

			// Redirect to the protected page after successful login
			window.location.href = '/pois';
		} catch (err) {
			console.error('Google login failed:', err);
			alert('Login failed. Please try again.');
		}
	}
</script>

<Navbar />

<section class="section">
	<div class="container">
		<div class="columns is-centered">
			<div class="column is-6">
				<h1 class="title">Log in</h1>
				{#if message}
					<div class="notification is-danger">{message}</div>
				{/if}

				<!-- Local Login Form-->

				<form method="POST" action="/login">
					<div class="field">
						<label class="label" for="email">Email</label>
						<input
							id="email"
							class="input"
							type="email"
							placeholder="Enter email"
							name="email"
							required
						/>
					</div>

					<div class="field">
						<label class="label" for="password">Password</label>
						<input
							id="password"
							class="input"
							type="password"
							placeholder="Enter password"
							name="password"
							required
						/>
					</div>

					<button class="button is-warning is-fullwidth">Log In</button>
				</form>
				<!-- Firebase GitHub login -->
				<div class="has-text-centered mt-4">
					<button class="button is-primary is-medium" on:click={loginWithGitHub}>
						<span class="icon"><i class="fab fa-github"></i></span>
						<span>Sign in with GitHub</span>
					</button>
					<button class="button is-primary is-medium" on:click={loginWithGoogle}>
						<span class="icon"><i class="fab fa-google"></i></span>
						<span>Sign in with Google</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<Footer />
