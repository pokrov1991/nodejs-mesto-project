import { ERROR_FORBIDDEN_CODE } from '../constants/errors';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN_CODE;
  }
}

export default ForbiddenError;
