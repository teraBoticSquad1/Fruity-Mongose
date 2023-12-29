import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { validateEmail } from '../../../helpers/checkEmailFormateValidity';
import { checkPasswordStrength } from '../../../helpers/checkPasswordStrength';
import { isPasswordMatched } from '../../../helpers/encription';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

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

const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  const result = await User.findOne({ email: email }).select('+password');
  if (!result) {
    throw new ApiError(httpStatus.OK, 'User not found !');
  }

  const isMatched = await isPasswordMatched(password, result?.password);

  if (!isMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not matched');
  }
  // create user access token and refresh token
  const { id, role } = result;

  const accessToken = jwtHelpers.createToken(
    { id, role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;
  console.log(id);

  const isUserExist = await User.findById(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  refreshToken,
};
