import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Proficiency {
  @PrimaryGeneratedColumn()
  id_proficiency: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  weight: number;
}
