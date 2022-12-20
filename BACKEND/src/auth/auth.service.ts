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
    // console.log(email, pass);
    // Find le role et l'utilisateur et checker le password
    const user = await this.userService.findByEmail(email);

    // La comparaison du mot de passe du user doit se faire à se niveau
    // if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
    if (user && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string) {
    // return les informations de l'utilisateur

    const payload = await this.userService.loginUser(email);

    // Créer la clé jwt à partir des informations de l'utilisateur
    // Le payload constitue le token qu'on doit crypté
    const token = {
      userId: payload.id,
      xsrfToken: randomUUID(),
      scopes: {
        role: payload.role,
        school: payload.school,
        class: payload.schoolClass,
      }, //Accès de l'utilisateur
      sub: payload.email,
    };
    const jwtToken = this.jwtService.sign(token);

    // return payloadWithToken;
    return { token, jwtToken };
    // Arnaud method
    // Générer le token et le stocker dans la db avec le timestamp
  }

  // Trouver un moyen de supprimer le cookie que l'utilisateur envoie (sessionId afin qu'il ne l'envoie plus)
  async logout(res) {
    console.log(res.signedCookies);
    res.clearCookie('sessionId');
    return {
      message: 'successfull clear',
    };
  }

  checkUserSession = (xsrfToken: string, token) => {
    // Ensuite récupérer l'information que l'utilisateur à besoin récupérer maintenant ses informations

    //vérification du jwt
    return verify(token, jwtConstants.secret, function (err, decoded) {
      if (decoded.xsrfToken != xsrfToken) {
        //erreur attaque csrf
        throw new UnauthorizedException();
      } else {
        //pas d'erreur on continue
        // next();
        return true;
      }
    });
  };

  async createUsersExcel(CreateUserDto: UserFormData[]) {
    return await this.userService.createUsersExcel(CreateUserDto);
  }

  async register(data) {
    // data.password = await bcrypt.hash(data.password, 10);
    const response = await this.userService.create(data);
    // console.log(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
