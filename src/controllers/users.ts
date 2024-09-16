import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { handleError, handleUpdateById } from '../utils';
import { EXPIRES_SECONDS } from '../constants/auth';
import User from '../models/user';

require('dotenv').config();

const { JWT_SECRET_KEY = '' } = process.env;

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: EXPIRES_SECONDS });

      res
        .cookie('token', token, { maxAge: EXPIRES_SECONDS, httpOnly: true })
        .send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message }); // TODO - 401
    });
};

export const createUser = (req: Request, res: Response) => {
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
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(res, err, 'Данные для создания пользователя неверные'));
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(res, err));
};

export const getUser = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return handleError(res, false, 'Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => handleError(res, err, 'Не валидный id пользователя'));
};

export const getUserMe = (req: Request, res: Response) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return handleError(res, false, 'Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => handleError(res, err, 'Не валидный id пользователя xxx'));
};

export const updateUser = (req: Request, res: Response) => {
  const { name, about } = req.body;

  handleUpdateById(
    res,
    User,
    req.user._id,
    { name, about },
    'Данные для обновления пользователя неверные',
    'Данные не обновлены. Пользователь не найден',
  );
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  handleUpdateById(
    res,
    User,
    req.user._id,
    { avatar },
    'Данные для обновления аватара неверные',
    'Аватар не обновлен. Пользователь не найден',
  );
};
