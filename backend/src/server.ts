import * as moment from 'moment';
import * as cors from 'cors'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import {createConnection, MoreThanOrEqual} from 'typeorm';
import { Room } from './entity/Room';
import { Reservation } from './entity/Reservation';

createConnection().then(async connection => {
    const roomRepo = connection.getRepository(Room)
    const reservationRepo = connection.getRepository(Reservation)

    const app =  express();

    app.use(cors());
    app.use(bodyParser.json());

    app.get('/rooms', async (req: express.Request, res: express.Response) => {
        res.json(await roomRepo.find())
    });

    app.get('/reservations', async (req: express.Request, res: express.Response) => {
        const today = moment().format('YYYY-MM-DD');
        const reservations = await reservationRepo.find({
            where: { date: MoreThanOrEqual(today)},
            relations: ['room']
        });

        res.json(reservations)
    });

    app.post('/rooms/:roomId/reservations', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const {date, reserverName} = req.body;

        if (!date || !reserverName) {
            return next(new Error('400 - bad request'));
        }

        const room = await roomRepo.findOne({name: req.params.roomId});
        if (!room) {
            return next(new Error('404 - room not found'));
        }

        const reservations = await reservationRepo.find({
            room: {name: req.params.roomId},
            date: date
        });

        const reservedByReserver = reservations.find(reservation => reservation.reserverName === reserverName);
        if (reservedByReserver) {
            return next(new Error('sorry, you already have reserved this room for this day'));
        }

        if (reservations.length >= room.capacity) {
            return next(new Error('too many reservations'))
        }

        const myReservation = reservationRepo.create({
            date, reserverName, room
        })

        await reservationRepo.save(myReservation)

        res.status(201).end('reservation created');
    })

    app.delete('/rooms/:roomId/reservations', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const {date, reserverName} = req.body;

        if (!date || !reserverName) {
            return next(new Error('400 - bad request'));
        }

        const room = await roomRepo.findOne({name: req.params.roomId});
        if (!room) {
            return next(new Error('404 - room not found'));
        }

        const myReservation = reservationRepo.create({
            date, reserverName, room
        })

        await reservationRepo.delete(myReservation)

        res.status(201).end('reservation canceled');
    })

    app.use((error, req, res, next) => {
        res.status(500).end(error.message)
    })

    app.listen(3000)
});