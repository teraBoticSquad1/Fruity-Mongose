import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
