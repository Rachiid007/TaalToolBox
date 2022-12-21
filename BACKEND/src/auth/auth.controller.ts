import { AuthenticatedGuard } from './guard/authenticated.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import type { UserFormData } from 'src/types';
import debug from 'config/debug';
import { UnauthorizedException } from '@nestjs/common';
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
    const user = await this.authService.findUserByEmail(payload.email);

    // Mettre le jwtToken dans le cookie de l'utilisateur
    debug(req.headers);

    // BESOIN DE MENTIONNER LES ENTETES CAR ON NE TRAVERSE PAS LE GUARDIEN DAUTHENTIFICATION
    const ALLOWED_ORIGINS = ['http://127.0.0.1:5173'];
    if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
      res.set('Access-Control-Allow-Origin', req.headers.origin);
      res.set('Access-Control-Allow-Credentials', 'true');
      res.set('Access-Control-Allow-Methods', 'POST');
    }
    res.cookie('sessionId', user.jwtToken, {
      secure: true,
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 2 * 1000,
      sameSite: 'None', //Should be "strict" in prod
      signed: true,
    });
    debug(res.header);
    res.send({
      message: 'Token contenu dans le xsrf',
      xsrfToken: user.token.xsrfToken,
    });
    debug(res.cookies);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/register')
  async register(@Body() payload: UserFormData, @Req() req, @Res() res) {
    const user: any = this.authService.decodeToken(
      req.signedCookies['sessionId'],
    );
    const actualUser = await this.authService.getAllUserInfo(user.sub);

    // Necessite le role administrateur ou professeur pour rajouter des utilisateurs
    if (
      ['Administrateur', 'Professeur'].some((x) => actualUser.role.includes(x))
    ) {
      return await this.authService.register(payload);
    } else {
      throw new UnauthorizedException();
    }
  }

  // !! Route de test pour les différents guardiens (A NE PAS MODIFIER)
  @UseGuards(AuthenticatedGuard) //require a baerer token and validate token
  @Get('protected')
  getHello(@Req() req, @Res({ passthrough: true }) res) {
    const xsrfToken = req.headers['x-xsrf-token'];
    const token = req.signedCookies['sessionId'];

    const checkUser = this.authService.checkUserSession(xsrfToken, token);
    debug(checkUser);
    return { ...req.user, cookies: req.cookies['sessionId'] };
  }

  // !! @UseGuards(JwtAuthGuard) -- LE GARUDIEN JWT QUI CHECK LE TOKEN DANS LE HEADER BAERER A ETE ABANDONNE POUR CAUSE DE SECURITE
  @UseGuards(AuthenticatedGuard)
  @Get('users/role')
  async getUserScope(@Req() req) {
    const token = req.signedCookies['sessionId'];

    const user: any = this.authService.decodeToken(token);

    return await this.authService.getAllUserInfo(user.sub);
  }

  //TODO (HELP WANTED) SUPPRIMER LE COOKIE DANS LENTETE DES REQUETES LORSQUE LUTILISATEUR SE LOGOUT
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    debug(req.headers);

    res.json({ message: 'cookie clear' });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('users/excel')
  async createUsersExcel(@Body() createUserExcelDto: UserFormData[]) {
    return await this.authService.createUsersExcel(createUserExcelDto);
  }
}
