import { UserFormData } from './../types/index';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { randomUUID } from 'crypto';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService, // private refreshTokens: RefreshToken[] = [],
  ) {}

  async ValidateUser(email: string, pass: string): Promise<any> {
    // Find l'utilisateur et checker le password
    const user = await this.userService.findByEmail(email);

    if (user && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findUserByEmail(email: string) {
    // return les informations de l'utilisateur

    const payload = await this.userService.findByEmail(email);

    // Créer la clé jwt à partir des informations de l'utilisateur
    // Le payload constitue le token qu'on doit crypté
    const token = {
      userId: payload.id,
      xsrfToken: randomUUID(),
      scopes: payload.id, //Accès de l'utilisateur
      sub: payload.email,
    };
    const jwtToken = this.jwtService.sign(token);

    return { token, jwtToken };
  }

  //TODO Trouver un moyen de supprimer le cookie que l'utilisateur envoie (sessionId afin qu'il ne l'envoie plus)
  async logout(res) {
    console.log(res.signedCookies);
    res.clearCookie('sessionId');
    return {
      message: 'successfull clear',
    };
  }

  checkUserSession = (xsrfToken: string, token) => {
    //vérification du jwt
    return verify(token, jwtConstants.secret, function (err, decoded) {
      if (decoded.xsrfToken != xsrfToken) {
        //erreur potentiel attaque csrf
        throw new UnauthorizedException();
      } else {
        return true;
      }
    });
  };

  async findUserById(id: number) {
    return await this.userService.findOne(id);
  }

  async getAllUserInfo(email: string) {
    return await this.userService.loginUser(email);
  }
  async createUsersExcel(CreateUserDto: UserFormData[]) {
    return await this.userService.createUsersExcel(CreateUserDto);
  }

  async register(payload: UserFormData) {
    // data.password = await bcrypt.hash(data.password, 10);
    return await this.userService.createUser(payload);
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
