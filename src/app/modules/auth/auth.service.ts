import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { validateEmail } from '../../../helpers/checkEmailFormateValidity';
import { checkPasswordStrength } from '../../../helpers/checkPasswordStrength';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';

const registerUser = async (payload: IUser): Promise<IUser | null> => {
  const { password, ...othersData } = payload;
  //check email formate validity
  if (!validateEmail(othersData.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email formate is not valid');
  }
  // password validity check
  const passwordValidity = checkPasswordStrength(othersData.email, password);
  if (!passwordValidity.validity) {
    throw new ApiError(httpStatus.BAD_REQUEST, passwordValidity.msg);
  }

  const result = await User.create(payload);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not created');
  }

  return result;
};

export const AuthServices = {
  registerUser,
};
