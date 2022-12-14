import { IsString } from 'class-validator';
export class CreateLevelMapDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  position: Array<number>;

  activityId: number;

  difficultyId: number;

  themeId: number;
}
