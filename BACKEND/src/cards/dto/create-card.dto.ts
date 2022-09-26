import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly answers: string[];
}
