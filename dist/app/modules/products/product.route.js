"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const products_controller_1 = require("./products.controller");
const products_validation_1 = require("./products.validation");
const validedRequest_1 = __importDefault(require("../../middlewares/validedRequest"));
const router = express_1.default.Router();
router.get('/', products_controller_1.ProductController.getAll);
router.post('/create', (0, validedRequest_1.default)(products_validation_1.ProductsValidation.createProductZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), products_controller_1.ProductController.createSingle);
router.put('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), products_controller_1.ProductController.updateSingle);
router.get('/:id', products_controller_1.ProductController.getSingle);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), products_controller_1.ProductController.deleteSingle);
exports.ProductRoutes = router;
