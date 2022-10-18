import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneUser({ email: email });
    console.log(await bcrypt.hash(pass, 10));
    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    // console.log(user.user);
    const payload = {
      user: {
        id: user.user.id,
        email: user.user.email,
        name: user.user.name,
      },
    };
    // console.log({payload});
    return {
      access_token: this.jwtService.sign(payload),
    };
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
