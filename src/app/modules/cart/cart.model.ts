import { Schema, Types, model } from 'mongoose';
import { CartModel, ICart } from './cart.interface';

export const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cart = model<ICart, CartModel>('Cart', cartSchema);
