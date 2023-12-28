import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

/* 

export type IUser = {
  role: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  address: string;
  orders: Types.ObjectId[] | IOrder[];
  myReviews: Types.ObjectId[] | IReview[];
};


*/
const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],

    myReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
