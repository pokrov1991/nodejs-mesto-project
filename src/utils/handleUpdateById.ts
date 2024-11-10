import mongoose, { Model } from 'mongoose';
import { Response, NextFunction } from 'express';
import { NotFoundError, ValidationError } from '../errors';

export const handleUpdateById = <T extends mongoose.Document>(
  res: Response,
  next: NextFunction,
  model: Model<T> | any,
  id: mongoose.Types.ObjectId | string,
  params: object,
  messageError: string,
  messageNotFound: string,
) => {
  model.findByIdAndUpdate(
    id,
    params,
    { new: true, runValidators: true },
  )
    .then((data: any) => {
      if (!data) {
        return next(new NotFoundError(messageNotFound));
      }
      return res.send(data);
    })
    .catch((err: { name: string; }) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ValidationError(messageError));
      }
      return next(err);
    });
};
