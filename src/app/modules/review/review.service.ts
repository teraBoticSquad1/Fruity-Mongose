import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiErrors';
import { IReview } from './review.interface';
import { Review } from './review.model';

const create = async (payload: IReview): Promise<IReview> => {
  const result = await Review.create(payload);
  return result;
};

const getAll = async (): Promise<IReview[]> => {
  const result = await Review.find().populate('user').populate('product');
  return result;
};

const getSingle = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id).populate('user').populate('product');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found !');
  }

  return result;
};

const updateSingle = async (
  userId: string,
  role: string,
  payload: Partial<IReview>,
  id: string
): Promise<IReview | null> => {
  const isExist = await Review.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found !');
  }

  if (role === ENUM_USER_ROLE.ADMIN || role === ENUM_USER_ROLE.SUPER_ADMIN) {
    const result = await Review.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    return result;
  } else {
    if (isExist.user.toString() !== userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user request ');
    }
    const result = await Review.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    return result;
  }
};

const deleteSingle = async (userId: string, role: string, id: string) => {
  const isExist = await Review.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found !');
  }
  if (role === ENUM_USER_ROLE.ADMIN || role === ENUM_USER_ROLE.SUPER_ADMIN) {
    const result = await Review.findOneAndDelete({ _id: id });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Review not delete !');
    }

    return result;
  } else {
    if (isExist.user.toString() !== userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user request ');
    }
    const result = await Review.findOneAndDelete({ _id: id });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Review not delete !');
    }

    return result;
  }
};

export const ReviewService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
