import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
<<<<<<< HEAD
  OneToMany,
=======
>>>>>>> 0919701 (new classes creation service)
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { School } from '../../school/entities/school.entity';
@Entity()
export class Schoolclass {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

<<<<<<< HEAD
<<<<<<< HEAD
  @Column({ name: 'schoolId' })
  schoolId: number;

  // une classe appartient à une et une seule école
  @OneToOne(() => School, (schoolId) => schoolId.id)
  @JoinColumn({ name: 'schoolId' })
=======
  @OneToOne(() => School)
  @JoinColumn()
>>>>>>> 0919701 (new classes creation service)
  school: School;
=======
  @ManyToOne(() => School, (school) => school.schoolclass )
  // @JoinColumn({name: [role]})
  school: School
>>>>>>> f0aa062 (:sparkles: feat(addClass): UPdate of the addition of a new class)
}
