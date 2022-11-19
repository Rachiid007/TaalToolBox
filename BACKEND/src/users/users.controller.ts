import { UsersService } from '../users/users.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    @Get()
    async findByEmail(@Query() query: { email: string; password: string }) {
      return await this.usersService.loginUser(query.email, query.password);
    }
 
}
