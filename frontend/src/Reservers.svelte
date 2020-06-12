<style>
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>

<script>
    import reservationsState from './state/reservations'

    export let day = null;

    let reservers = []

    $: reservers = $reservationsState
        .filter(reservation => reservation.date === day)
        .map(reservation => reservation.reserverName);
</script>

<ul>
    {#each reservers as reserver}
        <li>{reserver}</li>
    {/each}
</ul>