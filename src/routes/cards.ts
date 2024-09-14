import { Router } from 'express';
import {
  createCard, getCards, deleteCard, updateLike, deleteLike,
} from '../controllers/cards';

const router = Router();

router.post('/', createCard);

router.get('/', getCards);

router.delete('/:id', deleteCard);

router.put('/:id/likes', updateLike);

router.delete('/:id/likes', deleteLike);

export default router;
