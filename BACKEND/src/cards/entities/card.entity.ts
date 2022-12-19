import { LevelDifficulty } from './../../level_difficulty/entities/level_difficulty.entity';
import { CardsTheme } from './../../cards_theme/entities/cards_theme.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Card {
  @ApiProperty({
    description: 'Unique card ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  word: string;

  @ApiProperty()
  @Column()
  translation: string;

  @ApiProperty({
    description: 'Path of the image',
  })
  @Column({ default: null })
  image: string;

  // Chaque niveau correspond a un niveau de difficulté de carte
  // un niveau à une difficulté
  @Column({ name: 'difficultyId', default: null })
  difficultyId: number;
  // plusieur niveau peuvent avoir le meme niveau de difficulté
  // Une difficulté appartient à plusieur niveau de map
  @ManyToOne(() => LevelDifficulty, (level_difficulty) => level_difficulty.id)
  @JoinColumn({ name: 'difficultyId' })
  level_difficulty: LevelDifficulty;

  // @Column()
  // theme_id: number;

  @ManyToMany(() => CardsTheme)
  @JoinTable()
  cardstheme: CardsTheme[];
}
