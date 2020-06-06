import { derived } from 'svelte/store';

import reservationsState from './reservations'
import daysState from './days'
import roomsState from './rooms'
import userState from './user'

export default derived(
	[reservationsState, daysState, roomsState, userState],
	([$reservations, $days, $rooms, $user]) => {
        const ret = {}

        for (const day of $days) {
            ret[day] = {}
            const userReservationsOfDay = $reservations.filter(reservation => reservation.date === day && reservation.reserverName === $user.name)

            const validName = !!$user.name
            const hasBookedAnywhere = userReservationsOfDay.length > 0

            for (const room of $rooms) {
                const reservationsOfDayAndRoom = $reservations.filter(reservation => reservation.room.name === room.name && reservation.date === day)
                const hasBookedThisRoom = reservationsOfDayAndRoom.find(reservation => reservation.reserverName === $user.name);

                let state = 'available';
                if (reservationsOfDayAndRoom.length > 0 && reservationsOfDayAndRoom.length < room.capacity) {
                    state = 'middleCapacity'
                } else if (reservationsOfDayAndRoom.length >= room.capacity) {
                    state = 'capacityReached'
                }

                const isBookable = validName && !hasBookedAnywhere && reservationsOfDayAndRoom.length < room.capacity

                ret[day][room.name] = {
                    day,
                    roomName: room.name,
                    state,
                    isBookable,
                    hasBookedThisRoom,
                    reservers: reservationsOfDayAndRoom.map(reservation => reservation.reserverName)
                }
            }
        }

        return ret;
    }
);