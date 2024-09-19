import { ERROR_AUTHORIZATION_CODE } from '../constants/errors';

class AuthorizationError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = ERROR_AUTHORIZATION_CODE;
  }
}

export default AuthorizationError;
