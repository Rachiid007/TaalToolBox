import { IsString } from 'class-validator';

export class CreateCardsThemeDto {
  @IsString()
  name: string;
}
