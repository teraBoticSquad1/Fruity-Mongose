import z from 'zod';

const addOrderZodValidation = z.object({
  body: z.object({
    cartId: z.string({ required_error: 'Cart id is required ' }),
    shippingFee: z.number({ required_error: 'Shipping fee is required ' }),
    shippingAddress: z.string({ required_error: 'Address is required ' }),
    contact: z.string({ required_error: 'Contact is required ' }),
    paymentMethod: z.string({ required_error: 'Payment method is required ' }),
  }),
});

export const OrderZodValidation = {
  addOrderZodValidation,
};
