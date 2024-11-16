import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  login, createUser,
} from '../controllers/users';
import {
  LOGIN, CREATE_USER,
} from '../constants/joi-schemas';

const router = Router();

router.post('/signin', celebrate(LOGIN), login);

router.post('/signup', celebrate(CREATE_USER), createUser);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

export default router;
