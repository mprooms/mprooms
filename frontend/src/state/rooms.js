import { writable } from 'svelte/store';

const { subscribe, set } = writable([]);

export default {
    subscribe,
    load: async () => {
        const resRooms = await fetch('http://localhost:3000/rooms');
        const rooms = await resRooms.json();

        set(rooms);
    }
};