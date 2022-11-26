import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { School } from '../../school/entities/school.entity';
@Entity()
export class Schoolclass {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @Column({ name: 'schoolId' })
  schoolId: number;

  // une classe appartient à une et une seule école
  @OneToOne(() => School, (schoolId) => schoolId.id)
  @JoinColumn({ name: 'schoolId' })
  school: School;
}
