import { CardsTheme } from './../../cards_theme/entities/cards_theme.entity';
import { LevelDifficulty } from './../../level_difficulty/entities/level_difficulty.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class LevelMap {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  name: string;
  // Stocker la position du jeu sur la map

  @Column('float', { array: true })
  position: number[];

  // Difficulté des cartes (un niveau de difficulté par carte)
  // Mentionner le niveau de difficulté des cartes ?
  // Plusieur niveau peuvent avoir le même niveau de difficulté
  @Column({ name: 'difficultyId' })
  difficultyId: number;

  @ManyToOne(() => LevelDifficulty, (levelDifficulty) => levelDifficulty.id)
  @JoinColumn({ name: 'difficultyId' })
  levelDifficulty: LevelDifficulty;

  // Theme
  // Un niveau peut porter sur plusieurs theme
  // Plusieur niveau peuvent avoir le même theme
  @Column('character varying')
  themeId: number;

  @ManyToOne(() => CardsTheme, (cards_theme) => cards_theme.id)
  @JoinColumn({ name: 'themeId' })
  cardsTheme: CardsTheme;
}
