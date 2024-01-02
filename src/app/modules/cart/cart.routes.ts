import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CartController } from './cart.controller';

const router = express.Router();

router.post('/add', auth(ENUM_USER_ROLE.CUSTOMER), CartController.addToCart);

export const CartRoutes = router;
