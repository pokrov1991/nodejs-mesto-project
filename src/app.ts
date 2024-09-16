import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routerAuth from './routes/auth';
import routerUser from './routes/users';
import routerCard from './routes/cards';
import auth from './middlewares/auth';

require('dotenv').config();

const { PORT = 3000, MONGODB_URL } = process.env;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(String(MONGODB_URL));

// Роуты, не требующие авторизации (signup, signin)
app.use('/', routerAuth);

// Авторизация
app.use(auth);

// Роуты, которым авторизация нужна
app.use('/users', routerUser);
app.use('/cards', routerCard);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
