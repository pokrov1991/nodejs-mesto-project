import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getUsers, getUser, getUserMe, updateUser, updateAvatar,
} from '../controllers/users';
import {
  GET_USERS, GET_USER, GET_USERS_ME, UPDATE_USER, UPDATE_AVATAR,
} from '../constants/joi-schemas';

const router = Router();

router.get('/', celebrate(GET_USERS), getUsers);

router.get('/me', celebrate(GET_USERS_ME), getUserMe);

router.patch('/me', celebrate(UPDATE_USER), updateUser);

router.patch('/me/avatar', celebrate(UPDATE_AVATAR), updateAvatar);

router.get('/:id', celebrate(GET_USER), getUser);

export default router;
