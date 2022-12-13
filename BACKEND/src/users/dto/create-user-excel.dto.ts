import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { Role } from '../../role/entities/role.entity';
import { Lang } from '../../lang/entities/lang.entity';
import { IsDate, IsEmail, IsString } from 'class-validator';
export class CreateUserExcelDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  schoolEmail: string;

  @IsEmail()
  privateEmail: string;

  @IsDate()
  birthdate: string;

  schoolclass: Schoolclass[];

  @IsString()
  sex: string;

  @IsString()
  password: string;

  role: Role[];

  lang: Lang;
}
