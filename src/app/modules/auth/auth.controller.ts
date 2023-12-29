import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User register done !',
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  if (!result) {
    // Handle the case when result is null (e.g., return an error response)
    return sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User login failed',
      data: null,
    });
  }

  const { refreshToken, ...others } = result;
  // set refresh token in to cookie
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOption);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  // set refresh token into
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

export const AuthController = {
  registerUser,
  userLogin,
  refreshToken,
};
