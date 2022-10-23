import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birth_date: string;

  @Column()
  phone: string;

  @Column()
  starting_point: string;

  @Column()
  id_role: number;

  @Column()
  id_lang: number;

  @Column()
  id_school: string;

  @Column()
  id_schoolclass: string;
}
