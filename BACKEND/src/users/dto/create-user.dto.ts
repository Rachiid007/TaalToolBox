import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsDate()
  birth_date: Date;

  @IsString()
  phone: string;

  @IsString()
  starting_point: string;

  @IsNumber()
  id_role: number;

  @IsNumber()
  id_lang: number;

  @IsString()
  id_school: string;

  @IsString()
  id_schoolclass: string;
}
