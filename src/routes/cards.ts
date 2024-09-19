import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createCard, getCards, deleteCard, updateLike, deleteLike,
} from '../controllers/cards';
import {
  CREATE_CARD, GET_CARDS, DELETE_CARD, UPDATE_LIKE, DELETE_LIKE,
} from '../constants/joi-schemas';

const router = Router();

router.post('/', celebrate(CREATE_CARD), createCard);

router.get('/', celebrate(GET_CARDS), getCards);

router.delete('/:id', celebrate(DELETE_CARD), deleteCard);

router.put('/:id/likes', celebrate(UPDATE_LIKE), updateLike);

router.delete('/:id/likes', celebrate(DELETE_LIKE), deleteLike);

export default router;
