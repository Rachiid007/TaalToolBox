import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserResponseCardService } from './user_response_card.service';
import { CreateUserResponseCardDto } from './dto/create-user_response_card.dto';
import { UpdateUserResponseCardDto } from './dto/update-user_response_card.dto';

@Controller('user-response-card')
export class UserResponseCardController {
  constructor(private readonly userResponseCardService: UserResponseCardService) {}

  @Post()
  create(@Body() createUserResponseCardDto: CreateUserResponseCardDto) {
    return this.userResponseCardService.create(createUserResponseCardDto);
  }

  @Get()
  findAll() {
    return this.userResponseCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResponseCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserResponseCardDto: UpdateUserResponseCardDto) {
    return this.userResponseCardService.update(+id, updateUserResponseCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResponseCardService.remove(+id);
  }
}
