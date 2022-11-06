import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import {School} from "../../school/entities/school.entity"
@Entity()
export class Schoolclass {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @OneToOne(()=> School)
  @JoinColumn()
  school : School;
  
}
