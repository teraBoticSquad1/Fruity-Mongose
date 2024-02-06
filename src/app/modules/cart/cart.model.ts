import { Schema, Types, model } from 'mongoose';
import { CartModel, ICart } from './cart.interface';

export const cartSchema = new Schema<ICart, CartModel>(
  {
    user: {
      type: Types.ObjectId,
      required: true,
    },
    products: [
      {
        product: {
          type: Types.ObjectId,
          required: true,
        },
        // price: { type: Number },
        quantity: { type: Number, default: 1 },
      },
    ],
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cart = model<ICart, CartModel>('Cart', cartSchema);
