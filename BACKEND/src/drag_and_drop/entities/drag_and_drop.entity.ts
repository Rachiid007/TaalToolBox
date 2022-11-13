import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class dragAndDrop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    leveldata: JSON;

    @Column()
    levelname: string;

    @Column()
    creator: string;

}


