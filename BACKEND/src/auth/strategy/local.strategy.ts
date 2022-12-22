import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Permet de définir les colonnes que nous voulons envoyer à la db
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // C'est lui qui va contacter le service d'authentification
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.ValidateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
