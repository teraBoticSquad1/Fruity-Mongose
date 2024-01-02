/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { ProductService } from './product.service';

const createSingle = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await ProductService.create(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product add successfully ',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieve ',
    data: result,
  });
});
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await ProductService.getSingle(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieve ',
    data: result,
  });
});
const updateSingle = catchAsync(async (req: any, res: Response) => {
  const id: string = req.params.id;
  const data = req.body;
  const result = await ProductService.updateSingle(data, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product update successfully ',
    data: result,
  });
});
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const result = await ProductService.deleteSingle(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product delete successfully ',
    data: result,
  });
});

export const ProductController = {
  getAll,
  getSingle,
  updateSingle,
  createSingle,
  deleteSingle,
};
