import { Injectable } from '@nestjs/common';
import { CreateUserResponseCardDto } from './dto/create-user_response_card.dto';
import { UpdateUserResponseCardDto } from './dto/update-user_response_card.dto';

@Injectable()
export class UserResponseCardService {
  create(createUserResponseCardDto: CreateUserResponseCardDto) {
    return 'This action adds a new userResponseCard';
  }

  findAll() {
    return `This action returns all userResponseCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userResponseCard`;
  }

  update(id: number, updateUserResponseCardDto: UpdateUserResponseCardDto) {
    return `This action updates a #${id} userResponseCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResponseCard`;
  }
}
