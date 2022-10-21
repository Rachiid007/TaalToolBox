import { IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description?: string;
}
