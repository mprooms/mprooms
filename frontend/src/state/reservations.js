import { writable } from 'svelte/store';

const {subscribe, set} = writable([])

const reservationsStore = {
    subscribe,
    load: async () => {
        const reservationsResult = await fetch('/api/reservations');
        const reservations = await reservationsResult.json();

        set(reservations);
    },
    createReservation: async (date, roomName, reserverName) => {
        await fetch(`/api/rooms/${roomName}/reservations`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({reserverName, date})
        })

        //TODO: check result, show error message

        reservationsStore.load()
    },
    cancelReservation: async (date, roomName, reserverName) => {
        await fetch(`/api/rooms/${roomName}/reservations`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({reserverName, date})
        })

        //TODO: check result, show error message

        reservationsStore.load()
    }
};

export default reservationsStore
