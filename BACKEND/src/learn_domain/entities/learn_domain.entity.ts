import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LearnDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
