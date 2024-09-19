import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createCard, getCards, deleteCard, updateLike, deleteLike,
} from '../controllers/cards';
import { CREATE_CARD, CARD_ID } from '../constants/joi-schemas';

const router = Router();

router.post('/', celebrate(CREATE_CARD), createCard);

router.get('/', getCards);

router.delete('/:id', celebrate(CARD_ID), deleteCard);

router.put('/:id/likes', celebrate(CARD_ID), updateLike);

router.delete('/:id/likes', celebrate(CARD_ID), deleteLike);

export default router;
