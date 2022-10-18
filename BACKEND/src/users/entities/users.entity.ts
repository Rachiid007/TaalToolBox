import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Classroom } from './class.entity';
import { Role } from './roles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  surmane: string;

  @Column()
  email: string;

  @Column('character varying')
  password: string;

  @Column('date')
  birthdate: Date;

  @Column('character varying')
  telephone: string;

  @ManyToMany(() => Role)
  @JoinTable()
  role: Role[];

  @ManyToMany(() => Classroom)
  @JoinTable()
  class: Classroom[];
}
