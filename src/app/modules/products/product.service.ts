import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';

import { Category } from '../category/category.model';
import { IProduct } from './product.inteface';
import { Product } from './product.model';

const create = async (payload: IProduct): Promise<IProduct> => {
  const isValidCategories = await Category.exists({
    _id: { $in: payload.category },
  });

  if (!isValidCategories) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Provide valid category id');
  }

  const result = (await Product.create(payload)).populate('category');
  return result;
};

const getAll = async (): Promise<IProduct[]> => {
  const result = await Product.find().populate('category');
  return result;
};

const getSingle = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id).populate('category');
  // .populate('reviews');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found !');
  }

  return result;
};

const updateSingle = async (
  payload: Partial<IProduct>,
  id: string
): Promise<IProduct | null> => {
  const isExist = await Product.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found !');
  }

  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('category');
  // .populate('reviews');

  return result;
};

const deleteSingle = async (id: string) => {
  const isExist = await Product.findById(id).populate('category');
  // .populate('reviews');
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found !');
  }
  const result = await Product.findOneAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not delete !');
  }
  return result;
};

export const ProductService = {
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
  create,
};
