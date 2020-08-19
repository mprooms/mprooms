import moment from 'moment';
import { readable } from 'svelte/store';

export default readable([], (set) => {
    const now = moment()
    const days = []

    while(days.length < 7) {
        let day = now.day();

        if (!(day == 6 || day == 0)) {
            days.push(now.format('YYYY-MM-DD'))
        }

        now.add(1, 'days');
    }

    set(days)

	return function () {};
});