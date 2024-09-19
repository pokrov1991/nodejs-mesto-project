import { ErrorRequestHandler } from 'express';
import { ERROR_DEFAULT_CODE } from '../constants/errors';

const handleError: ErrorRequestHandler = (err, _req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_DEFAULT_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};

export default handleError;
