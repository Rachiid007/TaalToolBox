import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req);
  }

  @Get('classroom')
  getClassroom(@Req() req) {
    return req.classroom;
  }

  @Post('register')
  async register(@Body() data: any) {
    return this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
