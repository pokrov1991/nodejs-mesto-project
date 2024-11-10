import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import routerAuth from './routes/auth';
import routerUser from './routes/users';
import routerCard from './routes/cards';
import error from './middlewares/error';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';

require('dotenv').config();

const cors = require('cors');

const { PORT = 3000, MONGODB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(String(MONGODB_URL));

app.use(requestLogger);

// Роуты, не требующие авторизации (signup, signin)
app.use('/', routerAuth);

// Авторизация
app.use(auth);

// Роуты, которым авторизация нужна
app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use(errorLogger);

// Обработчик ошибок валидации celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
