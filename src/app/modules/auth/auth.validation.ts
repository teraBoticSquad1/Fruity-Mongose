import { z } from 'zod';
import { userRole } from './auth.constant';

const registerUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    email: z.string({ required_error: 'Email is required ' }),
    password: z.string({ required_error: 'Password is required ' }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userName: z.string({ required_error: 'User name is required ' }),
    address: z.string().optional(),
  }),
});

export const AuthValidation = {
  registerUserZodSchema,
};
