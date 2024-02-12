"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const cart_routes_1 = require("../modules/cart/cart.routes");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/orders/order.route");
const product_route_1 = require("../modules/products/product.route");
const user_route_1 = require("../modules/users/user.route");
const review_route_1 = require("../modules/review/review.route");
const router = express_1.default.Router();
const modulesRoute = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/cart',
        route: cart_routes_1.CartRoutes,
    },
    {
        path: '/order',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/review',
        route: review_route_1.ReviewRoutes,
    },
];
modulesRoute.map(route => router.use(route.path, route.route));
exports.default = router;
