import { ERROR_NOTFOUND_CODE } from '../constants/errors';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = ERROR_NOTFOUND_CODE;
  }
}

export default NotFoundError;
