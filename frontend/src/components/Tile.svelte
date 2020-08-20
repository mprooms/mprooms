<script>
  import { fade } from 'svelte/transition';
  import reservationsState from '../state/reservations'
  import userState from '../state/user'
  import matrixState from '../state/matrix'

  export let day;
  export let roomName;
  export let capacity;

  let data = {}

  $: data = $matrixState[day][roomName];

  function clickHandler() {
    if (data.isBookable) {
      createReservation();
    } else if (data.hasBookedThisRoom) {
      cancelReservation();
    }
  }

  function createReservation() {
      reservationsState.createReservation(day, roomName, $userState.name)
  }

  function cancelReservation() {
      reservationsState.cancelReservation(day, roomName, $userState.name)
  }
</script>

<div
  class="tile"
  class:has-booked={data.hasBookedThisRoom}
  class:not-bookable={!data.isBookable && !data.hasBookedThisRoom}
  title={data.reservers.join(', ')}
  on:click={clickHandler}
>
  <div class="marker {data.state}"/>
  <div class="info">
    <div class="capacity">
      {data.reservers.length}/{capacity}
    </div>
    <div class="action">
      {#if data.hasBookedThisRoom}
        <p transition:fade={{ duration: 100 }}>❌</p>
      {/if}
    </div>
  </div>

  {#each data.reservers as reserver}
    <p>{reserver}</p>
  {/each}
</div>

<style>
  :root {
    --border-size: 1px;
    --border: var(--border-size) solid rgba(0, 0, 0, .1);
    --padding: 1em;
    --background-stripes: repeating-linear-gradient(
      45deg,
      white,
      white 4px,
      rgba(0, 0, 0, .05) 4px,
      rgba(0, 0, 0, .05) 8px
    );
    --transition-fast: 50ms;
    --transition-slow: 100ms;
  }

  .tile {
    overflow: hidden;
    padding: var(--padding) var(--padding);
    position: relative;
    width: calc(100% - 2 * var(--padding) - var(--border-size));
    height: calc(100% - 2 * var(--padding) - var(--border-size));
    border-bottom: var(--border);
    border-right: var(--border);
    font-size: .9em;
    background-color: transparent;
    transition: background-color var(--transition-fast) ease-out;
  }

  .tile.has-booked {
    background-color: lightyellow;
  }

  .tile::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    transition: opacity var(--transition-slow) var(--transition-fast) ease-out;
    opacity: 0;
    background-image: var(--background-stripes);
  }

  .tile.not-bookable::before {
    opacity: 1;
  }

  .tile > p {
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile > .info {
    display: flex;
    justify-content: space-between;
  }

  .action {
    position: absolute;
    top: .8em;
    right: .5em;
  }

  .action > p {
    margin: 0;
  }

  .capacity {
    color: grey;
  }

  .marker {
    height: 100%;
    position: absolute;
    width: 4px;
    left: 0;
    top: 0;
    transition: background-color var(--transition-slow) ease-out;
  }

  div.available {
    background: darkgreen;
  }

  div.middleCapacity {
    background: orange
  }

  div.capacityReached {
    background: red
  }
</style>
