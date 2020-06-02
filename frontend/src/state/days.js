import moment from 'moment';
import { readable } from 'svelte/store';

export default readable([], (set) => {
    const now = moment()
    const then = now.clone().add(7, 'days')

    const days = []
    while (now < then) {
        days.push(now.format('YYYY-MM-DD'))
        now.add(1, 'days')
    }

    set(days)

	return function () {};
});