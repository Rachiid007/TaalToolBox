import { IsString } from 'class-validator';

export class CreateLearnDomainDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
