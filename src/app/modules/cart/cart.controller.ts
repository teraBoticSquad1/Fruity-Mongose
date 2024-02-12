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

const removeFromCart = catchAsync(async (req: any, res: Response) => {
  const { id } = req.user;
  const result = await CartService.removeFromCart(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove one from cart',
    data: result,
  });
});

const deleteFromCart = catchAsync(async (req: any, res: Response) => {
  const { id } = req.user;
  const result = await CartService.deleteProductFromCart(
    id,
    req.body.productId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete from cart',
    data: result,
  });
});
const getCartInfo = catchAsync(async (req: any, res: Response) => {
  const { id, role } = req.user;
  const result = await CartService.getCartInfo(role, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve cart info 🚀',
    data: result,
  });
});
const getSingleCartInfo = catchAsync(async (req: any, res: Response) => {
  const result = await CartService.getSingleCartInfo(req.params.cartId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve cart info 🚀',
    data: result,
  });
});
export const CartController = {
  addToCart,
  removeFromCart,
  deleteFromCart,
  getCartInfo,
  getSingleCartInfo,
};
