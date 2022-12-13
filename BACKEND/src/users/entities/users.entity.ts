import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { Lang } from '../../lang/entities/lang.entity';
@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  surname: string;

  @Column({
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  schoolEmail: string;

  @Column()
  privateEmail: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column('date')
  birthdate: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  sex: string;

  @ManyToMany(() => Role)
  @JoinTable()
  role: Role[];

  @ManyToMany(() => Schoolclass)
  @JoinTable()
  schoolclass: Schoolclass[];

  //chaque utilisateur possède une seule langue
  @ManyToOne(() => Lang, (lang) => lang.users)
  lang: Lang;
}
