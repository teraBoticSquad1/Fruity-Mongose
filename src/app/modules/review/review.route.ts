import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

import { ReviewController } from './review.controller';

const router = express.Router();

router.get('/', ReviewController.getAll);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.SUPER_ADMIN),
  ReviewController.createSingle
);
router.put(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  ReviewController.updateSingle
);
router.get('/:id', ReviewController.getSingle);
router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  ReviewController.deleteSingle
);

export const ReviewRoutes = router;
