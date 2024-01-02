import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProductController } from './products.controller';
import { ProductsValidation } from './products.validation';
import validateRequest from '../../middlewares/validedRequest';

const router = express.Router();

router.get('/', ProductController.getAll);
router.post(
  '/create',
  validateRequest(ProductsValidation.createProductZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.createSingle
);
router.put(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.updateSingle
);
router.get('/:id', ProductController.getSingle);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ProductController.deleteSingle
);

export const ProductRoutes = router;
