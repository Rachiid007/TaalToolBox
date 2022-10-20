import { IsString } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
