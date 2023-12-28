import { Types } from 'mongoose';
import { IProduct } from '../products/product.inteface';
import { IUser } from '../users/user.interface';

export type IReview = {
  product: Types.ObjectId | IProduct;
  user: Types.ObjectId | IUser;
  rating: number;
  feedback: string;
};
