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

export const UserService = {
  getAll,
  getSingle,
};
