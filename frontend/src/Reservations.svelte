<style>
    div {
        width: 5rem;
        height: 5rem;
    }

    div.available {
        background-color: darkgreen;
    }

    div.middleCapacity {
        background-color: orange
    }

    div.capacityReached {
        background-color: red
    }

    .hasBookedThisRoom {
        
    }
</style>

<script>
    import Icon from 'svelte-awesome';
    import { beer, refresh, comment, codeFork, camera, ban } from 'svelte-awesome/icons';

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
        reservationsState.createReservation(day, room.name, $userState.name)
    }

    let isBookable = false;
    let reservations = [];
    let reserverNames = '';

    let available = false;
    let middleCapacity = false;
    let capacityReached = false;
    let hasBookedThisRoom = false;

    $: {
        reservations = getReservationForDayAndRoom($reservationsState);
        const userReservationsForDay = getUserReservationForDay($reservationsState, $userState.name)

        const validName = !!$userState.name
        const hasBookedAnywhere = userReservationsForDay.length > 0
        hasBookedThisRoom = reservations.find(reservation => reservation.reserverName === $userState.name)

        available = reservations.length === 0
        middleCapacity = reservations.length > 0 && reservations.length < room.capacity
        capacityReached = reservations.length >= room.capacity

        isBookable = validName && !hasBookedAnywhere && !capacityReached
    }
</script>

<div 
    title={reservations.map(reservation => reservation.reserverName).join(', ')}
    class:available={available} 
    class:middleCapacity={middleCapacity} 
    class:capacityReached={capacityReached}
    class:hasBookedThisRoom={hasBookedThisRoom}
>
   
    <!-- <ul>
        {#each reservations as reservation}
            <li>{reservation.reserverName}</li>
        {/each}
    </ul> -->

    {#if isBookable}
        <button on:click={createReservation} disabled={!isBookable}>
            ✔️
        </button>
    {:else if hasBookedThisRoom}
        <button on:click={createReservation} disabled={!isBookable}>
            ❌
        </button>
    {/if}
</div>