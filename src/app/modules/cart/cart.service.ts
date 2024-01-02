import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { Product } from '../products/product.model';
import { User } from './../users/user.model';
import { ICartPayload } from './cart.interface';
import { Cart } from './cart.model';

const productAddToCart = async (payload: ICartPayload, userId: string) => {
  const { productId } = payload;
  const isValidUser = await User.findById(userId);
  if (!isValidUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isValidProduct = await Product.findById(productId);

  if (!isValidProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const cartInfo = await Cart.findOne({ user: userId });

  if (cartInfo) {
    const existingProduct = cartInfo.products.find(
      p => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartInfo.products.push({
        product: new mongoose.Types.ObjectId(productId),
        price: isValidProduct.price,
        quantity: 1,
      });
    }
    await cartInfo.save();
  } else {
    const newCart = new Cart({
      user: userId,
      products: [
        {
          product: new mongoose.Types.ObjectId(productId),
          price: isValidProduct.price,
          quantity: 1,
        },
      ],
    });
    // Save the new cart
    await newCart.save();
  }
  const result = await Cart.findOne({ user: userId });
  return result;
};

export const CartService = {
  productAddToCart,
};
