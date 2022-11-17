import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CreateUserResponseDto {
  @ApiProperty({
    description: 'Unique response ID',
  })
  @PrimaryGeneratedColumn()
  id_user_response: number;

  @ApiProperty()
  @Column()
  date_response: Date;

  @ApiProperty()
  @Column()
  id_user: number;

  @ApiProperty()
  @Column()
  id_card: number;

  @ApiProperty({
    description: 'id_answer',
  })
  @Column()
  id_answer: number;

  @ApiProperty({
    description: 'id_proficiency',
  })
  @Column()
  id_proficiency: number;
}
