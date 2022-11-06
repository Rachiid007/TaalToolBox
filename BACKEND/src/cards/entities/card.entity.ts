import { UserResponseCard } from './../../user_response_card/entities/user_response_card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  //Une card peut appartenir a plusieur réponse
  @OneToMany(()=>UserResponseCard, (response_card)=> response_card.card)
  response_card : UserResponseCard[]
}
