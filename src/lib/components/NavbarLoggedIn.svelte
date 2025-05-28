<script>
	let isActive = false;
	const toggle = () => (isActive = !isActive);
</script>

<nav class="navbar is-primary" style="margin-bottom: 20px; padding: 15px;">
	<div class="container">
		<!-- Logo + Brand -->
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<img src="/images/explorer-logo1.png" alt="Explorer Logo" width="50" height="50" />
				<strong class="ml-2 has-text-white">Explorer</strong>
			</a>

			<!-- Burger for Mobile -->
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

		<!-- Menu Items -->
		<div id="navMenu" class="navbar-menu" class:is-active={isActive}>
			<div class="navbar-end">
				<div class="navbar-item">
					<a href="/pois" class="button is-warning is-rounded mr-2"
						><strong class="has-text-weight-bold">Point of Interest</strong></a
					>
					<a href="/favourites" class="button is-warning is-rounded mr-2"
						><strong class="has-text-weight-bold">Favourites Places</strong></a
					>
					<a href="/logout" class="button is-warning is-rounded"
						><strong class="has-text-weight-bold">Logout</strong></a
					>
				</div>
			</div>
		</div>
	</div>
</nav>
