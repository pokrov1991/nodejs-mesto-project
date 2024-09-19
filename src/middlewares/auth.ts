import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthorizationError from '../errors/authorization';

require('dotenv').config();

const { JWT_SECRET_KEY = 'nostromo' } = process.env;

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

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
