<style>
	#app {
		width: 80%;
		margin: 0 auto;
	}

	#legend td {
		width: 2rem;
		height: 2rem;
	}

	#legend td+td {
		width: 10rem;
		height: 2rem;
	}

	td.available {
        background-color: darkgreen;
    }

    td.middleCapacity {
        background-color: orange
    }

    td.capacityReached {
        background-color: red
    }
</style>

<script>
	import roomsState from './state/rooms'
	import userState from './state/user'
	import daysState from './state/days'

	import Reservations from './Reservations'
</script>

<div id="app">
	<div>
		<input type="text" 
			placeholder="enter name here" 
			on:keyup={e => userState.setName(e.target.value)}
			value={$userState.name}
		/>
	</div>
	<table>
		<tr>
			<th></th>
			{#each $daysState as day}
				<td>{day}</td>
			{/each}
		</tr>
		{#each $roomsState as room}
			<tr>
				<th>Room {room.name}</th>
				{#each $daysState as day}
					<td>
						<Reservations day={day} roomName={room.name} />
					</td>
				{/each}
			</tr>
		{/each}
	</table>

	<table id="legend">
		<tr>
			<td class="available"></td>
			<td>Room is available</td>
		</tr>
		<tr>
			<td class="middleCapacity"></td>
			<td>Room already has reservations</td>
		</tr>
		<tr>
			<td class="capacityReached"></td>
			<td>Room has no space left</td>
		</tr>
		<tr>
			<td>✔️</td>
			<td>Book room for this day</td>
		</tr>
		<tr>
			<td>❌</td>
			<td>Cancel your reservation for this day</td>
		</tr>
	</table>
</div>