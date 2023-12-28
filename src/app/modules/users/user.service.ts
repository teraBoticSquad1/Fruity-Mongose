import { IUser } from './user.interface';
import { User } from './user.model';

const create = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  create,
};
