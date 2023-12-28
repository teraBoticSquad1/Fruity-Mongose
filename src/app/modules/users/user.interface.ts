import { Model, Types } from 'mongoose';
import { IOrder } from '../orders/order.interface';
import { IReview } from '../review/review.interface';

export type IUser = {
  role: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  address: string;
  orders: Types.ObjectId[] | IOrder[];
  myReviews: Types.ObjectId[] | IReview[];
};

export type UserModel = Model<IUser, Record<string, unknown>>;
