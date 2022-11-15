import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn('increment')
  id: number;

  /*@Column()
  userId: number;*/

  @Column()
  nombre_parties_flashcards: number;
  @Column()
  nombre_parties_drag: number;

  @OneToOne(() => Users)
  @JoinColumn()
  user_id: Users;
}
