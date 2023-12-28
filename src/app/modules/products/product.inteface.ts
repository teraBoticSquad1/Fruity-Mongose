import { Types } from 'mongoose';
import { ICategory } from '../category/category.interface';

export type IProduct = {
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  photo: string;
  gallery: string[];
  category: Types.ObjectId[] | ICategory[];
};
