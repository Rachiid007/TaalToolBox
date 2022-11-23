import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { Role } from '../../role/entities/role.entity';
import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  password: string;

  birthdate: Date;

  class: Array<Schoolclass>;

  registrationDate: Date;

  role: Array<Role>;
}
