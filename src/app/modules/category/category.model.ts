import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './category.interface';

export const categorySchema = new Schema<ICategory, CategoryModel>(
  {
    name: {
      type: String,
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

export const Category = model<ICategory, CategoryModel>(
  'Category',
  categorySchema
);
