import { User } from './user.model';

const getAll = async () => {
  const result = await User.find();
  return result;
};

export const UserService = {
  getAll,
};
