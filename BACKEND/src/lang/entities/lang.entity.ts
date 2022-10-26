import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}
