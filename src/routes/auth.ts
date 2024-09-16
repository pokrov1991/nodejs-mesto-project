import { Router } from 'express';
import {
  login, createUser,
} from '../controllers/users';

const router = Router();

router.post('/signin', login);

router.post('/signup', createUser);

export default router;
