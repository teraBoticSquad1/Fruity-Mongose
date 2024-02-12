/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import { ENUM_USER_ROLE } from '../../../enums/user';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constant';
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
const getAllOrder = catchAsync(async (req: any, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const { role, id } = req.user;

  if (role === ENUM_USER_ROLE.ADMIN || role === ENUM_USER_ROLE.SUPER_ADMIN) {
    const result = await OrderService.getAllOrder(filters, paginationOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieve successfully ✅ ',
      data: result,
    });
  } else {
    const result = await OrderService.getSingleUserAllOrder(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieve successfully ✅',
      data: result,
    });
  }
});

const getSingleOrderDetails = catchAsync(async (req: any, res: Response) => {
  const result = await OrderService.getSingleOrderDetails(req.params.orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieve successfully ✅ ',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  updateOrder,
  getAllOrder,
  getSingleOrderDetails,
};
