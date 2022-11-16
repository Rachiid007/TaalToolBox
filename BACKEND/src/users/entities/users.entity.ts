import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Schoolclass } from 'src/schoolclass/entities/schoolclass.entity';
import { Lang } from '../../lang/entities/lang.entity';
import { UserResponseCard } from 'src/user_response_card/entities/user_response_card.entity';
@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  surname: string;

  @Column()
  email: string;

  @Column('character varying')
  password: string;

  @Column('date')
  birthdate: string;

  @Column('character varying')
  phone: string;

  @ManyToMany(() => Role)
  @JoinTable()
  role: Role[];

  @ManyToMany(() => Schoolclass)
  @JoinTable()
  schoolclass: Schoolclass[];

  //chaque utilisateur possède une seule langue
  @ManyToOne(() => Lang, (lang) => lang.users)
  lang: Lang;

  //Une utilisateur peut avoir plusieurs solution
  @OneToMany(() => UserResponseCard, (response_card) => response_card.user)
  response_card: UserResponseCard[];
  nombre_de_parties_flashcards: any;
  nombre_de_parties_drag: any;
}
