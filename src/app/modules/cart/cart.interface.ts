import { Model, Types } from 'mongoose';
import { IProduct } from '../products/product.inteface';
import { IUser } from '../users/user.interface';

export type ISingleItem = {
  product: Types.ObjectId | IProduct;
  price: number;
  quantity: number;
};

export type ICart = {
  user: Types.ObjectId | IUser;
  products: ISingleItem[];
};

export type CartModel = Model<ICart, Record<string, unknown>>;

export type ICartPayload = {
  productId: string;
  quantity: number;
};
