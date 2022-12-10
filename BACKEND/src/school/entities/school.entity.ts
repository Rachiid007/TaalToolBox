import { Schoolclass } from 'src/schoolclass/entities/schoolclass.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class School {
  //Entité qui vont être utilisé à la création de la base de données
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  address: string;

  @Column('character varying', { default: null })
  description;

}
