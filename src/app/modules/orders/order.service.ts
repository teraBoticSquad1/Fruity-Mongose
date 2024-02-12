import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { Cart } from '../cart/cart.model';
import { IOrder, IOrderAddPayload } from './order.interface';
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

  // const result = await Order.create(orderInfo);
  // if (!result) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Order not create');
  // }
  return session;
};

export const OrderService = {
  addOrder,
};
