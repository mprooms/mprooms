<style>
	#app {
		width: 80%;
		margin: 0 auto;
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
						<Reservations day={day} room={room} />
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>