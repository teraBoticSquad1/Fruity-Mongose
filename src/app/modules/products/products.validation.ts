import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    code: z.string({ required_error: 'Product code is required ' }),
    name: z.string({ required_error: 'Product name is required ' }),
    description: z.string({
      required_error: 'Product description is required',
    }),
    price: z.number({ required_error: 'Product price is required' }),
    stock: z.number({ required_error: 'Product stoke ' }),
    photo: z.string({
      required_error: 'Products at least one photo is required',
    }),
    category: z.string({ required_error: 'Category required' }).array(),
    gallery: z.string().array().optional(),
  }),
});

export const ProductsValidation = {
  createProductZodSchema,
};
