import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Room {
    @PrimaryColumn()
    name: string;

    @Column()
    capacity: number;

    @Column()
    level: number;

    @OneToMany(type => Reservation, reservation => reservation.room)
    reservations: Reservation[];
}
