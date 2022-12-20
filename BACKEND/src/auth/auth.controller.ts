import { AuthenticatedGuard } from './guard/authenticated.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Query,
  Res,
  CacheKey,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import type { UserFormData } from 'src/types';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() payload: { email: string; password: string },
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    // Après avoir fait la vérification du mot de passe, faire la connexion de l'utilisateur
    // Loger l'utilisateur (appeler le service qui va s'occuper de sa : à la fin mettre le payload en jwt)
    // console.log(req);

    // console.log('req headers , req cookies--', req._headers, req.cookies);
    // console.log('req header --', req.headers);
    // console.log('req header --', req._headers.sessionId);
    // console.log(token, xsrfToken);
    // console.log(req.signedCookies);
    // // Cette fonction check si l'utilisateur à un cookie valide dans son entête
    // const checkToken = await this.authService.checkUserSession(
    //   xsrfToken,
    //   token,
    // );
    // console.log(checkToken:
    const user = await this.authService.login(payload.email);
    // utiliser le token pour le mettre dans la session
    console.log(this.authService.decodeToken(user.jwtToken)); //Le role de l'utilisateur est contenue dans le token
    // Mettre le jwtToken dans le cookie de l'utilisateur

    // For public information

    // For sensitive information
    console.log(req.headers);
    const ALLOWED_ORIGINS = ['http://127.0.0.1:5173'];
    if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
      res.set('Access-Control-Allow-Origin', req.headers.origin);
      res.set('Access-Control-Allow-Credentials', 'true');
      res.set('Access-Control-Allow-Methods', 'POST');
    }
    // res.set()
    // res.set('Access-Control-Allow-Credentials', 'true');
    res.cookie('sessionId', user.jwtToken, {
      // secure: process.env.NODE_ENV === 'dev' ? false : true, //set true in production
      secure: true,
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 2 * 1000,
      sameSite: 'None', //Should be "strict" in prod
      signed: true,
    });
    console.log(res.header);
    res.send({
      message: 'Token contenu dans le xsrf',
      xsrfToken: user.token.xsrfToken,
    });
    console.log(res.cookies);
  }

  // @UseGuards(JwtAuthGuard) //Necessite d'envoyer le token dans l'authorisation baerer
  @UseGuards(AuthenticatedGuard) //require a baerer token and validate token
  @Get('protected')
  getHello(@Req() req, @Res({ passthrough: true }) res) {
    // const ALLOWED_ORIGINS = ['http://127.0.0.1:5173'];
    // if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
    //   res.set('Access-Control-Allow-Origin', req.headers.origin);
    //   res.set('Access-Control-Allow-Credentials', 'true');
    //   res.set('Access-Control-Allow-Methods', 'GET');
    // }
    // // console.log('response', res);
    // // console.log('\n\n\n\n request', req);
    // console.log(req.cookies);
    // console.log(req.signedCookies);
    // console.log('req.header', req.headers);
    const xsrfToken = req.headers['x-xsrf-token'];
    const token = req.signedCookies['sessionId'];
    console.log(xsrfToken, token);
    const checkUser = this.authService.checkUserSession(xsrfToken, token);
    console.log(checkUser);
    console.log(this.authService.decodeToken(token));
    return { ...req.user, cookies: req.cookies['sessionId'] };
  }

  @UseGuards(AuthenticatedGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('users/role')
  getUserScope(@Req() req): any {
    const token = req.signedCookies['sessionId'];
    const user: any = this.authService.decodeToken(token);
    return user.scopes;
  }

  // @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    console.log(req.headers);

    res.json({ message: 'cookie clear' });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('users/excel')
  async createUsersExcel(@Body() createUserExcelDto: UserFormData[]) {
    // console.log(createUserExcelDto);
    return await this.authService.createUsersExcel(createUserExcelDto);
  }
  // @Post('auth/refresh')
  // // we need to create RefreshTokenDto
  // async refreshToken(@Body() body) {
  //   return this.authService.refresh(body.refreshToken);
  // }

  // @Delete('logout')
  // // we need to create RefreshTokenDto
  // async logout(@Body() body) {
  //   return this.authService.logout(body.refreshToken);
  // }

  // Placer ici toutes les routes qui sont protégé

  // @Get('classroom')
  // getClassroom(@Req() req) {
  //   return req.classroom;
  // }

  // @Post('register')
  // async register(@Body() data: any) {
  //   return this.authService.register(data);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Req() req) {
  //   return req.user;
  // }
}
