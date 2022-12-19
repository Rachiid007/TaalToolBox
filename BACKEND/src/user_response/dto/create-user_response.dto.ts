import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';

@Entity()
export class CreateUserResponseDto {
  @ApiProperty()
  @Column()
  dateResponse: Date;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  cardId: number;

  @ApiProperty({
    description: 'id_answer',
  })
  @Column()
  answerId: number;

  @ApiProperty({
    description: 'id_proficiency',
  })
  @Column()
  proficiencyId: number;
}
