/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { CategoryService } from './category.service';

const createSingle = catchAsync(async (req: any, res: Response) => {
  const data = req.body;
  const result = await CategoryService.create(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category add successfully ',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieve ',
    data: result,
  });
});
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await CategoryService.getSingle(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieve ',
    data: result,
  });
});
const updateSingle = catchAsync(async (req: any, res: Response) => {
  const id: string = req.params.id;
  const data = req.body;
  const result = await CategoryService.updateSingle(data, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category update successfully ',
    data: result,
  });
});
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const result = await CategoryService.deleteSingle(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category delete successfully ',
    data: result,
  });
});

export const CategoryController = {
  getAll,
  getSingle,
  updateSingle,
  createSingle,
  deleteSingle,
};
