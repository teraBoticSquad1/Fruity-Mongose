import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const create = async (payload: ICategory): Promise<ICategory> => {
  const result = await Category.create(payload);
  return result;
};

const getAll = async (): Promise<ICategory[]> => {
  const result = await Category.find();
  return result;
};

const getSingle = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found !');
  }

  return result;
};

const updateSingle = async (
  payload: Partial<ICategory>,
  id: string
): Promise<ICategory | null> => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found !');
  }

  const result = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteSingle = async (id: string) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found !');
  }
  const result = await Category.findOneAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not delete !');
  }
  return result;
};

export const CategoryService = {
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
  create,
};
