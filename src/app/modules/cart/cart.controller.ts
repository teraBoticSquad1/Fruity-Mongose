/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CartService } from './cart.service';

const addToCart = catchAsync(async (req: any, res: Response) => {
  const { id } = req.user;
  const result = await CartService.productAddToCart(req.body, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product add to cart',
    data: result,
  });
});

export const CartController = {
  addToCart,
};
