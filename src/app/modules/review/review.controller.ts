/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const createSingle = catchAsync(async (req: any, res: Response) => {
  const data = req.body;
  data.user = req.user.id;
  const result = await ReviewService.create(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review add successfully ',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieve ',
    data: result,
  });
});
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await ReviewService.getSingle(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieve ',
    data: result,
  });
});
const updateSingle = catchAsync(async (req: any, res: Response) => {
  const id: string = req.params.id;
  const { id: userId, role } = req.user;
  const data = req.body;
  const result = await ReviewService.updateSingle(userId, role, data, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review update successfully ',
    data: result,
  });
});
const deleteSingle = catchAsync(async (req: any, res: Response) => {
  const id: string = req.params.id;
  const { id: userId, role } = req.user;

  const result = await ReviewService.deleteSingle(userId, role, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review delete successfully ',
    data: result,
  });
});

export const ReviewController = {
  createSingle,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
