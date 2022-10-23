import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class UserResponse {
  @PrimaryGeneratedColumn()
  id_user_response: number;

  @Column()
  date_response: Date;

  @Column()
  id_user: number;

  @Column()
  id_card: number;

  @Column()
  id_answer: number;
}
