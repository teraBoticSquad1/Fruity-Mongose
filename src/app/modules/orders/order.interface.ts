import { Model, Types } from 'mongoose';
import { ICart } from '../cart/cart.interface';
import { IProduct } from '../products/product.inteface';
import { IUser } from '../users/user.interface';

export type IOrderedProduct = {
  product: Types.ObjectId | IProduct;
  price: number;
  quantity: number;
};

export type IOrderAddPayload = {
  cartId: Types.ObjectId | ICart;
  shippingFee: number;
  shippingAddress: string;
  contact: string;
  paymentMethod: 'Online Payment' | 'Cash on delivery';
};

export type IOrder = {
  products: IOrderedProduct[];
  subTotal: number;
  totalCost: number;
  shippingFee: number;
  user: Types.ObjectId | IUser;
  shippingAddress: string;
  contact: string;
  paymentMethod: 'Online Payment' | 'Cash on delivery';
  status:
    | 'Not Processed'
    | 'Processing'
    | 'Shipped'
    | 'Cancelled'
    | 'Delivered';
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
