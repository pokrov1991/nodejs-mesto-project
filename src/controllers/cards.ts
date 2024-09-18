import { Request, Response, NextFunction } from 'express';
import { handleUpdateById } from '../utils';
import { ConflictError, NotFoundError, ValidationError } from '../errors';
import Card from '../models/card';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => next(new ValidationError('Данные для создания карточки неверные')));
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Запрашиваемая карточка не найдена'));
      }

      if (card.owner.toString() !== req.body.user._id) {
        return next(new ConflictError('Запрашиваемую карточка удалить нельзя'));
      }

      return res.send({ data: card });
    })
    .catch(() => next(new ValidationError('Не валидный id карточки')));
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
