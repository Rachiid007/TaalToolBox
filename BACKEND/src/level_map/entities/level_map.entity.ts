import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LevelMap {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  // un niveau avec un theme
  @Column('')
  theme;
}
