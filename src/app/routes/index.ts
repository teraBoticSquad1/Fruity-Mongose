import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CartRoutes } from '../modules/cart/cart.routes';
import { CategoryRoutes } from '../modules/category/category.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { ProductRoutes } from '../modules/products/product.route';
import { UserRoutes } from '../modules/users/user.route';
import { ReviewRoutes } from '../modules/review/review.route';

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
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
