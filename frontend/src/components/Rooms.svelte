<script>
  import { fade } from 'svelte/transition';

  import Tile from './Tile';

  import roomsState from '../state/rooms.js';
	import daysState from '../state/days.js';
  import columnStore from '../state/columns.js';

  const animationDelay = 100;

$: availableDays = $daysState.length > 0 ? $daysState.slice(0, $columnStore) : [];

  function getGridPosition(row, column) {
    return `grid-row: ${row}; grid-column: ${column};`;
  }

  function getDelay(indexDay, indexRoom) {
    return indexDay * animationDelay + indexRoom * animationDelay;
  }
</script>

<div class="container">
  {#each $roomsState as room, indexRoom}
    <div style="{getGridPosition(indexRoom + 1, 1)}; align-self: center; justify-self: center;">
      {room.name}
    </div>

    {#each availableDays as day, indexDay}
      <div
        style="{getGridPosition(indexRoom + 1, indexDay + 2)}"
        in:fade={{delay: getDelay(indexDay, indexRoom)}}
      >
        <Tile day={day} roomName={room.name} capacity={room.capacity} />
      </div>
    {/each}
	{/each}
</div>

<style>
  .container {
    position: relative;
    align-items: stretch;
    display: grid;
    grid-gap: var(--app-grid-gap);
    grid-template-columns: var(--app-grid-columns);
    grid-auto-rows: minmax(9em, auto);
    justify-items: stretch;
    max-width: var(--content-max-width);
    margin: var(--table-view-margin) 0;
  }
</style>
