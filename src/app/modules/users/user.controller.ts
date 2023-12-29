/* eslint-disable @typescript-eslint/no-explicit-any */
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
const getSingle = catchAsync(async (req: any, res: Response) => {
  const { id: userId, role: userRole } = req.user as any;
  const id: string = req.params.id;
  const result = await UserService.getSingle(id, userId, userRole);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieve ',
    data: result,
  });
});

export const UserController = {
  getAll,
  getSingle,
};
