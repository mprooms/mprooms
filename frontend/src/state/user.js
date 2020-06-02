import { writable } from 'svelte/store';

const KEY_USER = 'user'

let userItem = localStorage.getItem(KEY_USER);
if (userItem) {
    userItem = JSON.parse(userItem)
} else {
    userItem = { name: null }
}

const { subscribe, update } = writable(userItem);

export default {
    subscribe,
    setName: (name) => {
        update(user => {
            const newUser = {...user, name};
            localStorage.setItem(KEY_USER, JSON.stringify(newUser));

            return newUser;
        });
    }
};