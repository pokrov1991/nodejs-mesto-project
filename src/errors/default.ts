import { ERROR_DEFAULT_CODE } from '../constants/errors';

class DefaultError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = ERROR_DEFAULT_CODE;
  }
}

export default DefaultError;
