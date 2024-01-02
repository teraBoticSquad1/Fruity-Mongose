import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';

import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/paginations';
import { Category } from '../category/category.model';
import { fruitSearchableFields } from './product.constant';
import { IProduct, IProductsFilters } from './product.inteface';
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

const getAll = async (
  filters: IProductsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: fruitSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ),
  //   });
  // }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'category') {
          // Handle special case for 'category' field
          return {
            [field]: {
              $in: [value], // Assuming the value is a single category, modify accordingly if it's an array
            },
          };
        } else {
          // Handle other fields normally
          return {
            [field]: value,
          };
        }
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions)
    .populate('category')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
