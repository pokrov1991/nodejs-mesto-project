import mongoose, { Model } from 'mongoose';
import { Response } from 'express';
import { handleError } from './handleError';

interface ErrorType extends Error {
  name: 'ValidationError' | 'CastError' | string;
  message: string;
}

export const handleUpdateById = <T extends mongoose.Document>(
  res: Response,
  model: Model<T> | any,
  id: mongoose.Types.ObjectId | string,
  params: object,
  messageError: string,
  messageNotFound: string,
) => {
  model.findByIdAndUpdate(
    id,
    params,
    { new: true },
  )
    .then((data: any) => {
      if (!data) {
        return handleError(res, false, messageNotFound);
      }
      return res.send({ data });
    })
    .catch((err: ErrorType) => handleError(res, err, messageError));
};
