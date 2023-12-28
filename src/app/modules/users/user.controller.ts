import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create User',
    data: result,
  });
});

export const UserController = {
  create,
};
