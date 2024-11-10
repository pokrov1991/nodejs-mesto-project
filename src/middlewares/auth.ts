import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthorizationError from '../errors/authorization';

require('dotenv').config();

const { JWT_SECRET_KEY = 'nostromo' } = process.env;

export default (req: Request, res: Response, next: NextFunction) => {
  // Сначала ищем токен в куке потом уже в заголовке
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
