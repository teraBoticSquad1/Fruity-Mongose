import { Schema, Types, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

export const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        type: Types.ObjectId,
        ref: 'Product',
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Online Payment', 'Cash on delivery'],
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Not Processed',
        'Processing',
        'Shipped',
        'Cancelled',
        'Delivered',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
