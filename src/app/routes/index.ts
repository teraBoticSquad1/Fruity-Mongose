import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { UserRoutes } from '../modules/users/user.route';
import { ProductRoutes } from '../modules/products/product.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
