import { Types } from 'mongoose';
import { IProduct } from '../products/product.inteface';
import { IUser } from '../users/user.interface';

export type IOrder = {
  products: Types.ObjectId[] | IProduct[];
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
