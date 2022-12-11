import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserResponseService } from './user_response.service';
import { CreateUserResponseDto } from './dto/create-user_response.dto';

@Controller('user-response')
export class UserResponseController {
  constructor(private readonly userResponseService: UserResponseService) {}

  @Post()
  create(@Body() createUserResponseDto: CreateUserResponseDto) {
    return this.userResponseService.create(createUserResponseDto);
  }

  @Get()
  findAll() {
    return this.userResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResponseService.findOne(+id);
  }

  @Post(':id_user/cards')
  updateMany(
    @Param('id_user') id_user: number,
    @Body() userResponse: object[],
  ) {
    return this.userResponseService.updateMany(+id_user, userResponse);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResponseService.remove(+id);
  }
}
