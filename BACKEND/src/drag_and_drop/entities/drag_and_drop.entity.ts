import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class dragAndDrop {
  @ApiProperty({
    description: 'Unique level ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column('simple-json')
  //   levelData: {
  //     positions: [];
  //     imgLink: string;
  //   };
  @ApiProperty({
    description: 'Data of the level',
  })
  @Column()
  leveldata: string;

  @ApiProperty({
    description: 'Name of the level',
  })
  @Column()
  levelname: string;

  @ApiProperty({
    description: 'Name of the creator',
  })
  @Column()
  creator: string;

  @ApiProperty({
    description: 'URL to the background image',
  })
  @Column({ default: null })
  image: string;
}
