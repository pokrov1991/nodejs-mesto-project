import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

require('dotenv').config();

const { JWT_SECRET_KEY = '' } = process.env;

// eslint-disable-next-line consistent-return
export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' }); // TODO - 401
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' }); // TODO - 401
  }

  req.user = payload;

  next();
};
