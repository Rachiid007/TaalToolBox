import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
@Entity()
export class Lang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  //Une langue peut appartenir à plusieurs utilisateur
  @OneToMany(() => Users, (users) => users.lang)
  users: Users[];
}
