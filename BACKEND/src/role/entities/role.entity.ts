import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying', { default: null })
  description: string;
}
