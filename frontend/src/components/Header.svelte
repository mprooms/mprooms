<script>
  import moment from 'moment';
  import daysState from '../state/days';
  import columnStore from '../state/columns';

  function getWeekday(dateAsString) {
    return moment(dateAsString).format('ddd');
  }

  function getMonthDay(dateAsString) {
    return moment(dateAsString).format('MM-DD');
  }

  $: columnDays = $daysState.length > 0 ? $daysState.slice(0, $columnStore) : [];
</script>

<div class="container">
  <div>
    <p>Room</p>
  </div>

  {#each columnDays as day, index}
    <div >
      <p>{getMonthDay(day)}</p>
      <p>{getWeekday(day)}</p>
    </div>
  {/each}
</div>

<style>
  .container {
    background-color: white;
    border-bottom: var(--table-view-border);
    display: grid;
    grid-template-columns: var(--app-grid-columns);
    grid-template-rows: auto;
    justify-items: center;
    max-width: var(--content-max-width);
    min-height: var(--table-view-margin);
    position: fixed;
    top: 0;
    width: var(--app-width);
    z-index: 1;
  }

  .container > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .container p {
    margin: .5em;
  }

  div:not(:first-child) > p:first-child {
    margin-bottom: 0;
    font-size: .9em;
    color: gray;
  }

  @media (max-width: 512px) {
    .container > div:first-child {
      visibility: hidden;
    }
  }
</style>
