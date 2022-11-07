import { Injectable } from '@nestjs/common';
import { CreateUserResponseDto } from './dto/create-user_response.dto';
import { UpdateUserResponseDto } from './dto/update-user_response.dto';

@Injectable()
export class UserResponseService {
  create(createUserResponseDto: CreateUserResponseDto) {
    return 'This action adds a new userResponse';
  }

  findAll() {
    return `This action returns all userResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userResponse`;
  }

  update(id: number, updateUserResponseDto: UpdateUserResponseDto) {
    return `This action updates a #${id} userResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResponse`;
  }
}
