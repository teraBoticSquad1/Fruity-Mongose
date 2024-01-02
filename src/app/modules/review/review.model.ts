import { Schema, Types, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

export const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    product: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview, ReviewModel>('Review', reviewSchema);
