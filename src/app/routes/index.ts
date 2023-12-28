import express from 'express';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/user',
    route: UserRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
