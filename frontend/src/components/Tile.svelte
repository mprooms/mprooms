<script>
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
  class:not-bookable={!data.isBookable}
  title={data.reservers.join(', ')} on:click={clickHandler}
>
  <div class="marker {data.state}"/>
  <div class="info">
    <div class="capacity">
        {data.reservers.length}/{capacity}
    </div>
    <div class="action">
        {#if data.hasBookedThisRoom}
            ❌
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
  }

  .tile {
    overflow: hidden;
    padding: var(--padding) var(--padding);
    position: relative;
    width: calc(100% - 2 * var(--padding) - var(--border-size));
    height: calc(100% - 2 * var(--padding) - var(--border-size));
    border-bottom: var(--border);
    border-right: var(--border);
    font-size: .8em;
  }

  .tile > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile > .info {
    display: flex;
    justify-content: space-between;
  }

  .not-bookable {
    background: repeating-linear-gradient(
      45deg,
      white,
      white 4px,
      rgba(0, 0, 0, .05) 4px,
      rgba(0, 0, 0, .05) 8px
    );
  }

  .has-booked {
    background: lightyellow;
  }

  .action {
    position: absolute;
    top: .8em;
    right: .6em;
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
