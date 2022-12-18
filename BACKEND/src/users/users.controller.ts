// import { LocalAuthGuard } from './../auth/guard/local-auth.guard';
import type { UserFormData } from './../types/index';
import { UsersService } from '../users/users.service';
import {
  Controller,
  Body,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ROUTE DE TEST POUR LAUTHENTIFICATION ELLE SE TROUVE PLUTOT DANS LE DOSSIER AUTH
  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log(req);
  //   return req.user;
  // }
  // @UseGuards(LocalAuthGuard)
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
  async createUsersExcel(@Body() createUserExcelDto: UserFormData[]) {
    // console.log(createUserExcelDto);
    return await this.usersService.createUsersExcel(createUserExcelDto);
  }
}
