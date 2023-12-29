import express from 'express';
import validateRequest from '../../middlewares/validedRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserZodSchema),
  AuthController.registerUser
);
router.post(
  '/login',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.userLogin
);
router.post(
  '/refreshToken',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
