<script>
	let isActive = false;
	const toggle = () => (isActive = !isActive);
</script>

<nav class="navbar is-primary" style="margin-bottom: 20px; padding: 15px;">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<img src="/images/explorer-logo1.png" alt="Explorer Logo" width="50" height="50" />
				<strong class="ml-2 has-text-white">Explorer</strong>
			</a>

			<button
				class="navbar-burger"
				aria-label="menu"
				aria-expanded={isActive}
				aria-controls="navMenu"
				class:is-active={isActive}
				on:click={toggle}
				tabindex="0"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</button>
		</div>

		<div id="navMenu" class="navbar-menu" class:is-active={isActive}>
			<div class="navbar-end">
				<div class="navbar-item">
					<a href="/charts" class="button is-warning is-rounded"
						><strong class="has-text-weight-bold">Charts</strong></a
					>
				</div>
				<div class="navbar-item">
					<a href="/logout" class="button is-warning is-rounded"
						><strong class="has-text-weight-bold">Logout</strong></a
					>
				</div>
			</div>
		</div>
	</div>
</nav>
