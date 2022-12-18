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

  @ManyToMany(() => Schoolclass)
  @JoinTable()
  schoolclass: Schoolclass[];

  //chaque utilisateur possède une seule langue
  @ManyToOne(() => Lang, (lang) => lang.users)
  lang: Lang;

  //Chaque utilisateur peut avoir un seul role
  @ManyToOne(() => Role)
  @JoinTable()
  role: Role[];

  //Chaque utilisateur peut avoir un seul role
  @ManyToOne(() => Role)
  @JoinTable()
  role: Role[];
}
