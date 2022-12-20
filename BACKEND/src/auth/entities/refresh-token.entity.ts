import { sign } from 'jsonwebtoken';
import { jwtConstants } from '../constants';

class RefreshToken {
  // Take a valid encrypted token and return new access token
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  id: number;
  userId: number;

  sign(): string {
    return sign({ ...this }, jwtConstants.refresh);
  }
}

export default RefreshToken;
