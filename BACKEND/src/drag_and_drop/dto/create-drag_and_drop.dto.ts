import { IsString, IsJSON, IsOptional } from 'class-validator';

export class CreateDragDto {
  // @IsJSON()
  // leveldata: {
  //   positions: [];
  //   imgLink: string;
  // };
  @IsString()
  leveldata: string;

  @IsString()
  levelname: string;

  @IsString()
  creator: string;

  @IsString()
  @IsOptional()
  image: string;
}
