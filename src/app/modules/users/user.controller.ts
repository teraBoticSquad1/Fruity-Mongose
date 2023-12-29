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
const updateSingle = catchAsync(async (req: any, res: Response) => {
  const { id: userId, role: userRole } = req.user as any;
  const id: string = req.params.id;
  const data = req.body;
  const result = await UserService.updateSingle(data, id, userId, userRole);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users update successfully ',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users delete successfully ',
    data: result,
  });
});

export const UserController = {
  getAll,
  getSingle,
  updateSingle,
  deleteUser,
};
