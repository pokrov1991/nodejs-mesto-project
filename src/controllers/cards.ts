import { Request, Response } from 'express';
import { handleError } from '../utils';
import Card from '../models/card';

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(res, err, 'Данные для создания карточки неверные'));
};

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(res, err));
};

export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (!card) {
        return handleError(res, false, 'Запрашиваемая карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => handleError(res, err, 'Не валидный id карточки'));
};

export const updateLike = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return handleError(res, false, 'Лайк не поставлен. Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => handleError(res, err, 'Лайк не поставлен. Не валидный id карточки'));
};

export const deleteLike = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return handleError(res, false, 'Лайк не удален. Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => handleError(res, err, 'Лайк не удален. Не валидный id карточки'));
};
