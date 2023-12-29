import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieve ',
    data: result,
  });
});

export const UserController = {
  getAll,
};
