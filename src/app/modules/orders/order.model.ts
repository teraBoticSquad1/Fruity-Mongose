import { Schema, Types, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

export const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price: Number,
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    subTotal: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    shippingFee: {
      type: Number,
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
