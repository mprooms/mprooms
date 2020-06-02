<script>
	import roomsState from './state/rooms'
	import userState from './state/user'
	import daysState from './state/days'

	import Reservations from './Reservations'
</script>

<div class="App">
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
			{#each $roomsState as room}
				<td>{room.name}</td>
			{/each}
		</tr>
		{#each $daysState as day}
			<tr>
				<th>{day}</th>
				{#each $roomsState as room}
					<td>
						<Reservations day={day} room={room} />
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>