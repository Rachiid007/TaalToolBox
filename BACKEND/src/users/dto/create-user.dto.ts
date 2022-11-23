import { Schoolclass } from '../../schoolclass/entities/schoolclass.entity';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  birthdate: string;

  // class: Array<Schoolclass> | null; //temporaire
  class: string;

  @IsNotEmpty()
  registrationDate: string;
}
