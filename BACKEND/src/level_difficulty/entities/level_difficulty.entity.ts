import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class LevelDifficulty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
