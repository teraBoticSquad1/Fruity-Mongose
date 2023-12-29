import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.model';

const getAll = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingle = async (
  id: string,
  userId: string,
  userRole: string
): Promise<IUser | null> => {
  const result = await User.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  if (userRole.toLowerCase() === 'customer' && userId !== id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not able to see others profile'
    );
  }
  return result;
};

const updateSingle = async (
  payload: Partial<IUser>,
  id: string,
  userId: string,
  userRole: string
): Promise<IUser | null> => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  if (userRole.toLowerCase() === 'customer' && userId !== id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not able to update others profile'
    );
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string) => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const result = await User.findOneAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not delete !');
  }
  return result;
};

export const UserService = {
  getAll,
  getSingle,
  updateSingle,
  deleteUser,
};
