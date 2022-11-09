import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserResponseCard } from 'src/user_response_card/entities/user_response_card.entity';
@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  //Une réponse peut appartenir à plusieurs solution de l'élève
  @OneToMany(() => UserResponseCard, (response_card) => response_card.answer)
  response_card: UserResponseCard[];
}
