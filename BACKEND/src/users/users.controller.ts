import type { UserFormData } from './../types/index';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Body, Get, Post, Param, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findByEmail(@Query() query: { email: string; password: string }) {
    return await this.usersService.loginUser(query.email, query.password);
  }

  @Post()
  async createUser(@Body() payload: UserFormData) {
    console.log(payload);

    // Dont send the array that we receive
    return await this.usersService.createUser(payload);
  }
}
