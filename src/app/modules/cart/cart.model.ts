import { Schema, Types, model } from 'mongoose';
import { CartModel, ICart } from './cart.interface';

export const cartSchema = new Schema({
  user: {
    type: Types.ObjectId,
    require: true,
  },
});

export const Cart = model<ICart, CartModel>('Cart', cartSchema);
