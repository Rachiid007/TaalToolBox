import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
