import z from 'zod';

const addToCartZodValidation = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product id is required' }),
  }),
});
const removeFromCartZodValidation = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product id is required' }),
  }),
});

export const CartValidation = {
  addToCartZodValidation,
  removeFromCartZodValidation,
};
