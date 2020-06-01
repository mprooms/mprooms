<style>
</style>

<script>
	import moment from 'moment'

	let reserverName = null;
	let rooms = []
	let reservations = []
	let days = []

	async function setup() {
		const resRooms = await fetch('http://localhost:3000/rooms')
		rooms = await resRooms.json()

		// const resReservations = await fetch('http://localhost:3000/rooms')
		// reservations = await resReservations.json()

		const now = moment()
		const then = now.clone().add(7, 'days')

		while (now < then) {
			days.push(now.format('YYYY-MM-DD'))
			now.add(1, 'days')
		}
	}

	async function bookNow(roomName, date) {
		if (!reserverName) {
			alert('reservername missing');
			return;
		}

		await fetch(`http://localhost:3000/rooms/${roomName}/reservations`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({reserverName, date})
		})
	}

	setup()
</script>

<div class="App">
	<div>
		<input type="text" bind:value={reserverName}>
	</div>
	<table>
		<tr>
			<th></th>
			{#each rooms as room}
				<td>{room.name}</td>
			{/each}
		</tr>
		{#each days as day}
			<tr>
				<th>{day}</th>
				{#each rooms as room}
					<td><button on:click={bookNow(room.name, day)}>book now</button></td>
				{/each}
			</tr>
		{/each}
	</table>
</div>