import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { OrderCOntroller } from './order.controller';
import { OrderZodValidation } from './order.validation';

const router = express.Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  validateRequest(OrderZodValidation.addOrderZodValidation),
  OrderCOntroller.createOrder
);

export const OrderRoutes = router;
