import { UsersService } from '../users/users.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findByEmail(@Query() query: { email: string; password: string }) {
    return await this.usersService.loginUser(query.email, query.password);
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
 
}
