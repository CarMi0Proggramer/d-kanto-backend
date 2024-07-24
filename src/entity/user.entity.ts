import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Purchase } from "./purchase.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => Purchase, purchases => purchases.user)
    purchases: Purchase[];
}