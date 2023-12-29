import { Model } from 'mongoose';

export type ICategory = {
  name: string;
  products: [];
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
