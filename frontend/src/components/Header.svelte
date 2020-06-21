<script>
  import daysState from '../state/days';
  import columnStore from '../state/columns';

  $: columnDays = $daysState.length > 0 ? $daysState.slice(0, $columnStore) : [];
</script>

<div class="container">
  <div>
    <p>Room</p>
  </div>

  {#each columnDays as day, index}
    <div >
      <p>{day.split('-').slice(1).join('-')}</p>
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

  @media (max-width: 512px) {
		.container > div:first-child {
			visibility: hidden;
		}
	}
</style>
