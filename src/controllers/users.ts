import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { handleUpdateById } from '../utils';
import { EXPIRES_SECONDS } from '../constants/auth';
import { ConflictError, NotFoundError, ValidationError } from '../errors';
import User from '../models/user';

require('dotenv').config();

const { JWT_SECRET_KEY = 'nostromo' } = process.env;

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: EXPIRES_SECONDS });

      res
        .cookie('token', token, { maxAge: EXPIRES_SECONDS, httpOnly: true })
        .send({ token });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const objUser = user.toObject();
      Reflect.deleteProperty(objUser, 'password');
      return res.status(201).send({ data: objUser });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с данной почтой уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Данные для создания пользователя неверные'));
      }
      return next(err);
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Не валидный id пользователя'));
      }
      return next(err);
    });
};

export const getUserMe = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Не валидный id пользователя'));
      }
      return next(err);
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  handleUpdateById(
    res,
    next,
    User,
    req.user._id,
    { name, about },
    'Данные для обновления пользователя неверные',
    'Данные не обновлены. Пользователь не найден',
  );
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  handleUpdateById(
    res,
    next,
    User,
    req.user._id,
    { avatar },
    'Данные для обновления аватара неверные',
    'Аватар не обновлен. Пользователь не найден',
  );
};
