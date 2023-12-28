import { Schema, Types, model } from 'mongoose';
import { IProduct, ProductModel } from './product.inteface';

export const productSchema = new Schema<IProduct>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
        required: true,
      },
    ],
    category: [
      {
        type: Types.ObjectId,
        ref: 'Category', // replace 'Category' with the actual model name for categories
      },
    ],
    reviews: [
      {
        type: Types.ObjectId,
        ref: 'Review',
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

export const Product = model<IProduct, ProductModel>('Product', productSchema);
