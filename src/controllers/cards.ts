import { Request, Response, NextFunction } from 'express';
import { handleUpdateById } from '../utils';
import { ForbiddenError, NotFoundError, ValidationError } from '../errors';
import Card from '../models/card';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Данные для создания карточки неверные'));
      }
      return next(err);
    });
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Запрашиваемая карточка не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Запрашиваемую карточку удалить нельзя'));
      }
      Card.findByIdAndDelete(req.params.id)
        .then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Не валидный id карточки'));
      }
      return next(err);
    });
};

export const updateLike = (req: Request, res: Response, next: NextFunction) => {
  handleUpdateById(
    res,
    next,
    Card,
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    'Данные для установки лайка неверные',
    'Лайк не поставлен. Карточка не найдена',
  );
};

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  handleUpdateById(
    res,
    next,
    Card,
    req.params.id,
    { $pull: { likes: req.user._id } },
    'Данные для удаления лайка неверные',
    'Лайк не удален. Карточка не найдена',
  );
};
