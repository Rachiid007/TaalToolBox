import { Classroom } from '../entities/class.entity';
import { Role } from '../entities/roles.entity';

export class CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  birthdate: string;
  telephone: string;
  role: Array<Role>;
  class: Array<Classroom>;
}
