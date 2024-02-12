import httpStatus from 'http-status';
import mongoose, { SortOrder, Types } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiErrors';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import IPaginationOptions from '../../../interfaces/paginations';
import { Cart } from '../cart/cart.model';
import { orderSearchableFields } from './order.constant';
import {
  IOrder,
  IOrderAddPayload,
  IOrderUpdatePayload,
  IOrdersFilters,
} from './order.interface';
import { Order } from './order.model';

const addOrder = async (userID: string, payload: IOrderAddPayload) => {
  const { cartId, shippingFee, shippingAddress, contact, paymentMethod } =
    payload;

  const isCartExist = await Cart.findById(cartId);

  if (!isCartExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart info not found ❌');
  }

  if (isCartExist?.user.toString() !== userID) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User request ❌ ');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const subTotal = isCartExist?.products?.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const totalCost = subTotal + shippingFee;
    const orderInfo: IOrder = {
      products: isCartExist?.products,
      subTotal: Number(subTotal),
      totalCost: totalCost,
      shippingFee: shippingFee,
      shippingAddress: shippingAddress,
      user: new Types.ObjectId(userID),
      contact: contact,
      paymentMethod: paymentMethod,
      status: 'Not Processed',
    };
    const addOrderDb = await Order.create(orderInfo);
    if (!addOrderDb) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Order not create');
    }
    const removeCart = await Cart.findOneAndDelete(cartId);
    if (!removeCart) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Order not create');
    }
    await session.commitTransaction();
    await session.endSession();
    return addOrderDb;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const updateOrder = async (
  userRole: string,
  userId: string,
  orderId: string,
  payload: IOrderUpdatePayload
) => {
  const isOrderExist = await Order.findById(orderId);

  if (!isOrderExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not exist 📌');
  }

  if (
    userRole === ENUM_USER_ROLE.ADMIN ||
    userRole === ENUM_USER_ROLE.SUPER_ADMIN
  ) {
    const result = await Order.findByIdAndUpdate(orderId, payload);
    return result;
  } else {
    if (payload?.status !== 'Cancelled') {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not able to update status'
      );
    }
    if (isOrderExist?.status === 'Cancelled') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Order already canceled');
    }
    const result = await Order.findByIdAndUpdate(orderId, {
      status: payload.status,
    });
    return result;
  }
};

const getSingleUserAllOrder = async (userId: string) => {
  const result = await Order.find({ user: userId });
  return result;
};

const getAllOrder = async (
  filters: IOrdersFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: orderSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        // Handle other fields normally
        return {
          [field]: value,
        };
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Order.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleOrderDetails = async (orderId: string) => {
  const result = await Order.findById(orderId);
  return result;
};

export const OrderService = {
  addOrder,
  updateOrder,
  getAllOrder,
  getSingleUserAllOrder,
  getSingleOrderDetails,
};
