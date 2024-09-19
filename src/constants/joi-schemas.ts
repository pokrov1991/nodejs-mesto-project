import { Joi } from 'celebrate';

const cookies = Joi.object()
  .keys({
    token: Joi.string().required(),
  })
  .unknown(true);
const params = {
  id: Joi.string().alphanum().length(24).required(),
};

export const LOGIN = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const CREATE_USER = {
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const GET_USERS = {
  cookies,
};

export const GET_USERS_ME = {
  cookies,
};

export const UPDATE_USER = {
  cookies,
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
};

export const UPDATE_AVATAR = {
  cookies,
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
};

export const GET_USER = {
  cookies,
  params,
};

export const CREATE_CARD = {
  cookies,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }),
};

export const GET_CARDS = {
  cookies,
};

export const DELETE_CARD = {
  cookies,
  params,
};

export const UPDATE_LIKE = {
  cookies,
  params,
};

export const DELETE_LIKE = {
  cookies,
  params,
};
