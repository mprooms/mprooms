<script>
	import { fade } from 'svelte/transition';

	import Name from './Name';
	import Header from './Header';
	import Rooms from './Rooms';
	import Legend from './Legend';

	const roomsDelay = 200;
	let submitted = false;

	function toggle() {
		submitted = !submitted;
	}
</script>

<div id="app">
	<Header/>

	{#if submitted}
		<div in:fade={{delay: roomsDelay}} out:fade>
			<Rooms/>
		</div>
	{/if}

	<Legend on:clicked={() => toggle()}/>

	{#if !submitted}
		<div class="name" in:fade out:fade>
			<Name on:submitted={() => toggle()} />
		</div>
	{/if}
</div>

<style>
	:global(:root){
		--color-available: darkgreen;
		--color-reserved: orange;
		--color-full: red;

		--content-max-width: 80em;
		--app-width: 80%;
		--app-grid-columns: 4em repeat(auto-fit, minmax(0, 1fr));

		--table-view-border: 2px solid rgba(82, 118, 142, 1);
		--table-view-margin: 3.5em;

		color: rgba(20, 20, 20, 1);
	}

	:global(body) {
		margin: 0;
	}

	@media (max-width: 1024px) {
		:global(:root) {
			--app-width: 100%;
		}
	}

	@media (max-width: 512px) {
		:global(:root) {
			--app-grid-columns: 3em repeat(auto-fit, minmax(0, 1fr));
		}
	}

	#app {
		display: flex;
		margin: 0 auto;
		justify-content: center;
		width: var(--app-width);
	}

	#app > div:nth-child(2) {
		max-width: var(--content-max-width);
		width: 100%;
	}

	.name {
		z-index: 10;
	}
</style>
