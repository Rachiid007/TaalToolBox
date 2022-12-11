import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserResponse {
  @PrimaryGeneratedColumn('increment')
  id_user_response: number;

  @Column()
  date_response: Date;

  @Column()
  id_user: number;

  @Column()
  id_card: number;

  @Column()
  id_answer: number;

  @Column()
  id_proficiency: number;
}
