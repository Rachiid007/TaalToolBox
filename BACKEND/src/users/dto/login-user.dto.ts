import { IsEmail, IsString } from 'class-validator';

export class loginUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
