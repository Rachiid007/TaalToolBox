import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
<<<<<<< HEAD
export class Answer {
=======
export class Category {
>>>>>>> 61d731d ([ADD] answer)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
