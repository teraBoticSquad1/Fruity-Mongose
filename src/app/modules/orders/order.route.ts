import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { OrderController } from './order.controller';
import { OrderZodValidation } from './order.validation';

const router = express.Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  validateRequest(OrderZodValidation.addOrderZodValidation),
  OrderController.createOrder
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  OrderController.getAllOrder
);
router.get(
  '/:orderId',
  auth(
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  OrderController.getSingleOrderDetails
);

router.patch(
  '/update/:orderId',
  auth(
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),

  OrderController.updateOrder
);

export const OrderRoutes = router;
