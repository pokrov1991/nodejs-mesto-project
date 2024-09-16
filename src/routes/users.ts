import { Router } from 'express';
import {
  getUsers, getUser, getUserMe, updateUser, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getUserMe);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

router.get('/:id', getUser);

export default router;
