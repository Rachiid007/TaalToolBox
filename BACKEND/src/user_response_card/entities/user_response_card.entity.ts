import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Users } from 'src/users/entities/users.entity';
@Entity()
export class UserResponseCard {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date_response: Date;

  //chaque réponse est éffectué par un utilisateur
  @ManyToOne(() => Users, (users) => users.response_card)
  user: Users;

  //chaque solution de l'élève comporte une seule réponse(j'ai trouvé, ...)
  @ManyToOne(() => Answer, (answer) => answer.response_card)
  answer: Answer;

  //chaque réponse concerne une seule carte
  @ManyToOne(() => Card, (card) => card.response_card)
  card: Card;
}
