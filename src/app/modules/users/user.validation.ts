import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userName: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = { updateUserZodSchema };
