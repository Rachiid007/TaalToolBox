import { IsString, IsJSON } from 'class-validator';

export class CreateDragDto {
  @IsJSON()
  leveldata: JSON;
  
  @IsString()
  levelname: string;

  @IsString()
  creator: string;
}