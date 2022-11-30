import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardsTheme {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;
}
