import { AuthService } from '../auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService) {
    // Permet de définir les colonnes que nous voulons envoyer à la db
    // super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const ALLOWED_ORIGINS = ['http://127.0.0.1:5173'];
    if (ALLOWED_ORIGINS.indexOf(request.headers.origin) > -1) {
      response.set('Access-Control-Allow-Origin', request.headers.origin);
      response.set('Access-Control-Allow-Credentials', 'true');
      response.set('Access-Control-Allow-Methods', 'GET');
    }
    const xsrfToken = request.headers['x-xsrf-token'];
    const token = request.signedCookies['sessionId'];
    if (!xsrfToken || !token) {
      // Dans le meilleur des cas si l'utilisateur n'a pas le xsrfToken, générer un nouveau s'il a le token
      throw new UnauthorizedException();
    } else {
      // return request.isAuthenticated();
      this.authService.checkUserSession(xsrfToken, token);
      // return ckeckSession;
      return request;
    }
  }
}
