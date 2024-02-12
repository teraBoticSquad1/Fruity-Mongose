/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: any, res: Response) => {
  const { id } = req.user;

  const result = await OrderService.addOrder(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order placed success ✅ ',
    data: result,
  });
});
const updateOrder = catchAsync(async (req: any, res: Response) => {
  const { id, role } = req.user;
  const { orderId } = req.params;

  const result = await OrderService.updateOrder(role, id, orderId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order update successfully ✅ ',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  updateOrder,
};
