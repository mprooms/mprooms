import { writable } from 'svelte/store';

const {subscribe, set} = writable([])

const reservationsStore = {
    subscribe,
    load: async () => {
        const reservationsResult = await fetch('http://localhost:3000/reservations');
        const reservations = await reservationsResult.json();

        set(reservations);
    },
    createReservation: async (date, roomName, reserverName) => {
        await fetch(`http://localhost:3000/rooms/${roomName}/reservations`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({reserverName, date})
        })

        //TODO: check result, show error message

        reservationsStore.load()
    }
};

export default reservationsStore