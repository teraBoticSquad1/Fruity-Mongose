import { Model, Types } from 'mongoose';
import { ICategory } from '../category/category.interface';
import { IReview } from '../review/review.interface';

export type IProduct = {
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  photo: string;
  gallery: string[];
  category: Types.ObjectId[] | ICategory[];
  reviews: Types.ObjectId[] | IReview[];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
