import type { UserData } from './../types/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findOneUser(data: number | any): Promise<Users | undefined> {
    return await this.userRepository.findOne(data);
  }

  // Get the user in database and her role
  async loginUser(
    email: string,
    password: string,
  ): Promise<UserData | undefined> {
    if (!email || !password) {
      throw new NotFoundException();
    }
    //Decrypter le mot de passe du user
    //Get the users and here role
   
    const user = await this.userRepository
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.role', 'role')
      .where({ email: email, password: password })
      .getOne();
    if (!user) {
      throw new NotFoundException();
    }
    const userData = {
      name: user.name,
      surname: user.surname,
      role: user.role.map((x) => {
        return x.name;
      }),
      email: user.email,
      birthdate: user.birthdate,
      phone: user.phone,
    };
    return userData;
  }

  async create(data: CreateUserDto): Promise<any> {
    return await this.userRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }
}
