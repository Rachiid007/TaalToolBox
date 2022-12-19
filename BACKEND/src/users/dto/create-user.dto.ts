import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { Role } from '../../role/entities/role.entity';
import { IsEmail, IsString, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  birthdate: string;

  @IsEmail()
  phone: string;

  role: Array<Role>;

  class: Array<Schoolclass>;
}
