import { LevelMap } from './../../level_map/entities/level_map.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
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
  levelData: string;

  @ApiProperty({
    description: 'URL to the background image',
  })
  @Column({ default: null })
  image: string;
  // we store name, description of dad in level_map
  // DAL game is link with one level_map
  @Column('levelMapId')
  levelMapId: number;

  @OneToOne(() => LevelMap, (levelMap) => levelMap.id)
  @JoinColumn({ name: 'levelMapId' })
  levelMap: LevelMap;
}
