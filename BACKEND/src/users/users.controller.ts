import type { UserFormData } from './../types/index';
import { UsersService } from '../users/users.service';
import { CreateUserExcelDto } from '../users/dto/create-user-excel.dto';
import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findByEmail(@Query() query: { email: string; password: string }) {
    return await this.usersService.loginUser(query.email, query.password);
  }

  @Post()
  async createUser(@Body() payload: UserFormData) {
    // Dont send the array that we receive
    return await this.usersService.createUser(payload);
  }

  @Post('excel')
  async createUsersExcel(@Body() createUserExcelDto: CreateUserExcelDto[]) {
    // console.log(createUserExcelDto);
    return await this.usersService.createUsersExcel(createUserExcelDto);
  }

  @Get('subscription_stats/:id_user')
  @ApiParam({
    name: 'id_user',
    required: true,
    description: 'Should be an id of a teacher user',
    type: Number,
  })
  findSubscriptionStats(@Param('id_user') id_user: number) {
    return this.usersService.findSubscriptionStats(+id_user);
  }

  @Get('activePlayers/:id_user')
  @ApiParam({
    name: 'id_user',
    required: true,
    description: 'Should be an id of a teacher user',
    type: Number,
  })
  findActivePlayersCount(@Param('id_user') id_user: number) {
    return this.usersService.findActivePlayersCount(+id_user);
  }
 
}
