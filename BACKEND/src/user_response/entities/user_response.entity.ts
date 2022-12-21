import { LevelMap } from './../../level_map/entities/level_map.entity';
import { Users } from './../../users/entities/users.entity';
import { Card } from './../../cards/entities/card.entity';
import { Answer } from './../../answer/entities/answer.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class UserResponse {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  dateResponse: Date;

  @Column()
  userId: number;
  // Plusieurs réponse peuvent concernet un même utilisateur

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column()
  cardId: number;

  // Plusieurs réponse peuvent concerner la meme carte
  @ManyToOne(() => Card, (card) => card.id)
  @JoinColumn({ name: 'cardId' })
  card: Card;

  @Column()
  answerId: number;

  // Plusieur réponse peuvent avoir la meme answer
  @ManyToOne(() => Answer, (answer) => answer.id)
  @JoinColumn({ name: 'answerId' })
  answer: Answer;

  @Column({ nullable: true })
  levelMapId: number;
  // Plusieur réponse peuvent concerner une même niveau sur la carte
  @ManyToOne(() => LevelMap, (levelMap) => levelMap.id)
  @JoinColumn({ name: 'levelMapId' })
  levelMap: LevelMap;

  @Column()
  proficiencyId: number;
}
