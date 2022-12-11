import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
export class UsersRepository extends Repository<Users> {}
