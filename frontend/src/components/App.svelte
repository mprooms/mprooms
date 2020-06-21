<style>
	:global(:root){
		--content-max-width: 80em;
		--app-width: 80%;
		--app-grid-columns: 4em repeat(auto-fit, minmax(0, 1fr));

		--table-view-border: 2px solid rgba(82, 118, 142, 1);
		--table-view-margin: 3.5em;

		--color-available: darkgreen;
		--color-reserved: orange;
		--color-full: red;
	}

	#app {
		width: 80%;
		margin: 0 auto;
	}

	#legend td+td {
		width: 10rem;
		height: 2rem;
	}
</style>

<script>
	import roomsState from '../state/rooms'
	import userState from '../state/user'
	import daysState from '../state/days'

	import Header from './Header';
	import Rooms from './Rooms';
	import Legend from './Legend';
	import Reservations from './Reservations'
	import Reservers from './Reservers'
</script>

<div id="app">
	<div>
		<input type="text"
			placeholder="enter name here"
			on:keyup={e => userState.setName(e.target.value)}
			value={$userState.name}
		/>
	</div>

	<Header />
	<Rooms />
	<Legend/>
</div>