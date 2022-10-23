import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createUsersDto: CreateUsersDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUsersDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
