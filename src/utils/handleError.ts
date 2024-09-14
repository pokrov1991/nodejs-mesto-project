import { Response } from 'express';
import { ERROR_VALIDATION_CODE, ERROR_NOTFOUND_CODE, ERROR_DEFAULT_CODE } from '../constants/errors';

interface ErrorType extends Error {
  name: 'ValidationError' | 'CastError' | string;
  message: string;
}

export const handleError = (res: Response, err: ErrorType | false, message: string = 'Не валидные данные для запроса') => {
  if (!err) {
    return res.status(ERROR_NOTFOUND_CODE).send({ message });
  }
  if (['ValidationError', 'CastError'].includes(err.name)) {
    return res.status(ERROR_VALIDATION_CODE).send({ message: `${message}: ${err.message}` });
  }
  return res.status(ERROR_DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
};
