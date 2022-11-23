import { UsersService } from 'src/users/users.service';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

interface UserFromExcel {
  lastName: string;
  firstName: string;
  email: string;
  birthdate: string;
  class: string;
  registrationDate: string;
}
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findByEmail(@Query() query: { email: string; password: string }) {
    return await this.usersService.loginUser(query.email, query.password);
  }

  @Post()
  async postUsers(users: UserFromExcel[]) {
    console.log(users);

    users?.forEach(async (user) => {
      const userData: CreateUserDto = {
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        birthdate: user.birthdate,
        class: user.class,
        registrationDate: user.registrationDate,
      };
      await this.usersService.create(userData);
    });
  }
}
