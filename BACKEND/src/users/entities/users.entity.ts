import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { Lang } from '../../lang/entities/lang.entity';
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

  @Column({ nullable: true })
  infos: string;

  @ManyToMany(() => Role)
  @JoinTable()
  role: Role[];

  @ManyToMany(() => Schoolclass)
  @JoinTable()
  schoolClass: Schoolclass[];

  //chaque utilisateur possède une seule langue
  @ManyToOne(() => Lang, (lang) => lang.users)
  lang: Lang;
}
