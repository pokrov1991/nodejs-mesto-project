import { Request, Response } from 'express';
import { handleError, handleUpdateById } from '../utils';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
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
