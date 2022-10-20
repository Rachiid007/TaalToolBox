import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
