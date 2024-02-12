"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validedRequest_1 = __importDefault(require("../../middlewares/validedRequest"));
const cart_controller_1 = require("./cart.controller");
const cart_validation_1 = require("./cart.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.ADMIN), cart_controller_1.CartController.getCartInfo);
router.get('/:cartId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), cart_controller_1.CartController.getSingleCartInfo);
router.post('/add', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), (0, validedRequest_1.default)(cart_validation_1.CartValidation.addToCartZodValidation), cart_controller_1.CartController.addToCart);
router.post('/remove', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), (0, validedRequest_1.default)(cart_validation_1.CartValidation.removeFromCartZodValidation), cart_controller_1.CartController.removeFromCart);
router.delete('/delete', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), cart_controller_1.CartController.deleteFromCart);
exports.CartRoutes = router;
