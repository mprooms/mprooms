<style>
    span {
        margin-right: 10px
    }
</style>

<script>
    import reservationsState from './state/reservations'
    import userState from './state/user'

    export let day;
    export let room;

    function getReservationForDayAndRoom(reservationsState) {
        return reservationsState.filter(reservation => {
            return reservation.date === day && reservation.room.name === room.name
        })
    }

    function getUserReservationForDay(reservationsState, userName) {
        return reservationsState.filter(reservation => {
            return reservation.date === day && reservation.reserverName === userName
        })
    }

    function createReservation() {
        if (!$userState.name) {
            //TODO: don't use an alert...
            return alert('name missing');
        }

        reservationsState.createReservation(day, room.name, $userState.name)
    }

    let isBookable = false;
    let reservations = [];
    $: {
        reservations = getReservationForDayAndRoom($reservationsState);
        const userReservationsForDay = getUserReservationForDay($reservationsState, $userState.name)

        const validName = !!$userState.name
        const hasBooked = userReservationsForDay.length > 0
        const capacityReached = reservations.length >= room.capacity

        isBookable = validName && !hasBooked && !capacityReached
    }
</script>

<div>
    {#each reservations as reservation}
        <span>{reservation.reserverName}</span>
    {/each}
    
    <button on:click={createReservation} disabled={!isBookable}>
        book now!
    </button>
</div>