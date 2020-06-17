import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Room } from "./Room";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    reserverName: string;

    @Column()
    date: string; // plz use the form YYYY-MM-DD

    @ManyToOne(type => Room, room => room.reservations) // eslint-disable-line no-unused-vars
    room: Room;
}
