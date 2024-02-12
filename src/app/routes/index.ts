import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CartRoutes } from '../modules/cart/cart.routes';
import { CategoryRoutes } from '../modules/category/category.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { ProductRoutes } from '../modules/products/product.route';
import { UserRoutes } from '../modules/users/user.route';

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
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
