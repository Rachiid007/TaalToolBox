import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(data) {
    return await this.userRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }
}
