import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(email: string, pass: string): Promise<any> {
    // console.log(email, pass);
    const user = await this.userService.findByEmail(email);

    // La comparaison du mot de passe du user doit se faire à se niveau
    // if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // console.log(user.user);
    console.log(user);
    console.log(user.user.email, user.user.password);

    const payload = await this.userService.loginUser(
      user.user.email,
      user.user.password,
    );

    console.log('payload -- ', payload);
    // const payload = {
    //   user: {
    //     id: user.user.id,
    //     email: user.user.email,
    //     name: user.user.name,
    //   },
    // };
    // console.log({payload});
    // Créer la clé jwt à partir des informations de l'utilisateur
    const payloadWithToken = {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
    console.log(payloadWithToken);
    return payloadWithToken;
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

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
