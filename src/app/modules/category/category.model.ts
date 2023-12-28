import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './category.interface';

export const categorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

export const Category = model<ICategory, CategoryModel>(
  'Category',
  categorySchema
);
