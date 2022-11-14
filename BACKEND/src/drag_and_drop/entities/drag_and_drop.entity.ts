import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class dragAndDrop {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column('simple-json')
  //   levelData: {
  //     positions: [];
  //     imgLink: string;
  //   };
  @Column()
  leveldata: string;

  @Column()
  levelname: string;

  @Column()
  creator: string;
}
