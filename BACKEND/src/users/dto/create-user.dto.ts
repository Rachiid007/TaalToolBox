import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { Role } from '../../role/entities/role.entity';
import { IsDate, IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  password: string;
  // @IsDate()
  birthdate: string;
  phone: string;
  role: Array<Role>;
  class: Array<Schoolclass>;
}
