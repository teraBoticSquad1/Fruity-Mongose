import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found ❌');
  }

  const cartInfo = await Cart.findOne({ user: userId });

  if (cartInfo) {
    const existingProductIndex = cartInfo.products.findIndex(
      p => p.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increment quantity
      cartInfo.products[existingProductIndex].quantity += 1;
      cartInfo.products[existingProductIndex].price = isValidProduct?.price;
    } else {
      // Product not in the cart, add a new entry
      cartInfo.products.push({
        product: new mongoose.Types.ObjectId(productId),
        price: isValidProduct?.price,
        quantity: 1,
      });
    }

    // Update the cart directly
    const result = await Cart.updateOne(
      { user: userId },
      { $set: { products: cartInfo.products } }
    );
    if (result?.modifiedCount === 0 || result.matchedCount === 0) {
      throw new ApiError(httpStatus.NOT_MODIFIED, 'Cart is not update❌');
    }
    const res = await Cart.findOne({ user: userId });
    return res;
  } else {
    // Create a new cart using updateOne
    const result = await Cart.updateOne(
      { user: userId },
      {
        $setOnInsert: {
          user: userId,
        },
        $push: {
          products: {
            product: new mongoose.Types.ObjectId(productId),
            price: isValidProduct.price,
            quantity: 1,
          },
        },
        new: true,
      },
      { upsert: true }
      // Create a new document if it doesn't exist
    );
    if (!result) {
      throw new ApiError(httpStatus.NOT_MODIFIED, 'Cart is not update❌');
    }
  }
  const res = await Cart.findOne({ user: userId });
  return res;
};

const removeFromCart = async (userId: string, payload: ICartPayload) => {
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
    const indexToRemove = cartInfo.products.findIndex(
      p => p.product.toString() === productId
    );
    if (indexToRemove !== -1) {
      // Product already exists in the cart, decrement quantity
      if (cartInfo.products[indexToRemove].quantity === 1) {
        cartInfo.products.splice(indexToRemove, 1);
        await cartInfo.save();
      } else {
        cartInfo.products[indexToRemove].quantity -= 1;
      }

      // Update the cart directly
      const result = await Cart.updateOne(
        { user: userId },
        { $set: { products: cartInfo.products } },
        { new: true }
      );

      if (result?.modifiedCount === 0 || result.matchedCount === 0) {
        throw new ApiError(httpStatus.NOT_MODIFIED, 'Cart is not update❌');
      }
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Product not found in the cart '
      );
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User cart not found !');
  }
  const result = await Cart.findOne({ user: userId });
  return result;
};

const deleteProductFromCart = async (userId: string, productId: string) => {
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
    const indexToRemove = cartInfo.products.findIndex(
      p => p.product.toString() === productId
    );
    if (indexToRemove !== -1) {
      cartInfo.products.splice(indexToRemove, 1);
      await cartInfo.save();

      // Update the cart directly
      const result = await Cart.updateOne(
        { user: userId },
        { $set: { products: cartInfo.products } },
        { new: true }
      );

      if (result?.modifiedCount === 0 || result.matchedCount === 0) {
        throw new ApiError(httpStatus.NOT_MODIFIED, 'Cart is not update❌');
      }
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Product not found in the cart '
      );
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User cart not found !');
  }
  const result = await Cart.findOne({ user: userId });
  return result;
};

const getCartInfo = async (userRole: string, userId: string) => {
  if (userRole === ENUM_USER_ROLE.ADMIN) {
    const result = await Cart.find();
    return result;
  } else {
    const result = await Cart.findOne({ user: userId });
    return result;
  }
};

export const CartService = {
  productAddToCart,
  removeFromCart,
  deleteProductFromCart,
  getCartInfo,
};
