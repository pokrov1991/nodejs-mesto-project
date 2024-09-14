import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import routerUser from './routes/users';
import routerCard from './routes/cards';

require('dotenv').config();

const { PORT = 3000, MONGODB_URL } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(String(MONGODB_URL));

// Временный мидлвар
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '66e4bdcdf981f0f2cc99ceaa',
  };

  next();
});

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
