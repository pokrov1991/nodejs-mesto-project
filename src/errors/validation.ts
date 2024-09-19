import { ERROR_VALIDATION_CODE } from '../constants/errors';

class ValidationError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = ERROR_VALIDATION_CODE;
  }
}

export default ValidationError;
