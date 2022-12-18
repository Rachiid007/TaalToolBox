import { IsString, IsJSON, IsOptional, IsNumber } from 'class-validator';

export class CreateDragDto {
  // @IsJSON()
  // leveldata: {
  //   positions: [];
  //   imgLink: string;
  // };
  @IsString()
  levelData: string;

  @IsNumber()
  levelMapId: number;

  @IsString()
  @IsOptional()
  image: string;
}
