import { IsArray, IsNumber, IsString } from 'class-validator';
export class CreateLevelMapDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;
  //validator fail If we dont put class validator to column
  @IsArray()
  position: Array<number>;

  @IsNumber()
  activityId: number;

  @IsNumber()
  difficultyId: number;

  @IsNumber()
  themeId: number;
}
