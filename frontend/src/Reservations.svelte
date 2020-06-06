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
    import reservationsState from './state/reservations'
    import userState from './state/user'
    import matrixState from './state/matrix'

    export let day;
    export let roomName;

    let data = {}

    $: data = $matrixState[day][roomName]

    function createReservation() {
        reservationsState.createReservation(day, roomName, $userState.name)
    }

    function cancelReservation() {
        reservationsState.cancelReservation(day, roomName, $userState.name)
    }
</script>

<div title={data.reservers.join(', ')} class='{data.state}'>
    {#if data.isBookable}
        <button on:click={createReservation}>
            ✔️
        </button>
    {:else if data.hasBookedThisRoom}
        <button on:click={cancelReservation}>
            ❌
        </button>
    {/if}
</div>