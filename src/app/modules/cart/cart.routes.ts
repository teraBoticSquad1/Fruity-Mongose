import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';

const router = express.Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(CartValidation.addToCartZodValidation),
  CartController.addToCart
);
router.post(
  '/remove',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(CartValidation.removeFromCartZodValidation),
  CartController.removeFromCart
);

export const CartRoutes = router;
