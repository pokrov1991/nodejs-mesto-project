import { ERROR_CONFLICT_CODE } from '../constants/errors';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = ERROR_CONFLICT_CODE;
  }
}

export default ConflictError;
