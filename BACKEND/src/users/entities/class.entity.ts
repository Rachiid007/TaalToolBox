import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  address: string;
}
