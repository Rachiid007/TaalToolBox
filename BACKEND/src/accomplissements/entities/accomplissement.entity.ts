import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accomplissements {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  Target: string;

  @Column()
  Titre: string;

  @Column()
  Description: string;

  @Column()
  Resultat: number;
}
