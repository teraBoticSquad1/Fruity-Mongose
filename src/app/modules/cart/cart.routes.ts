import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  CartController.getCartInfo
);
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
router.delete(
  '/delete',
  auth(ENUM_USER_ROLE.CUSTOMER),
  CartController.deleteFromCart
);
export const CartRoutes = router;
