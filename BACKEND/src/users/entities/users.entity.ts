import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { Lang } from '../../lang/entities/lang.entity';
import { UserResponseCard } from 'src/user_response_card/entities/user_response_card.entity';
import { Statistic } from 'src/statistic/entities/statistic.entity'

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  surname: string;

  @Column('character varying')
  email: string;

  @Column('character varying')
  schoolEmail: string;

  @Column()
  password: string;

  @Column('character varying')
  birthdate: string;

  @Column()
  sex: string;

  @ManyToMany(() => Role)
  @JoinTable()
  role: Role[];

  @ManyToMany(() => Schoolclass)
  @JoinTable()
  schoolclass: Schoolclass[];

  //chaque utilisateur possède une seule langue
  @ManyToOne(() => Lang, (lang) => lang.users)
  statistics: any;
  lang: Lang;
<<<<<<< HEAD
=======

  //Une utilisateur peut avoir plusieurs solution
  @OneToMany(() => UserResponseCard, (response_card) => response_card.user)
  response_card: UserResponseCard[];
  nombre_de_parties_flashcards: any;
  nombre_de_parties_drag: any;
<<<<<<< HEAD

  @OneToOne(() => Statistic)
  @JoinColumn()
  statistic: Statistic;
>>>>>>> cd0a472 (accomplissement service created)
=======
>>>>>>> c8ce166 (get statistics service)
>>>>>>> de881d2 (get statistics service)
}
