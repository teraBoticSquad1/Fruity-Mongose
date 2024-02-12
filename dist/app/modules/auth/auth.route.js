"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validedRequest_1 = __importDefault(require("../../middlewares/validedRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/register', (0, validedRequest_1.default)(auth_validation_1.AuthValidation.registerUserZodSchema), auth_controller_1.AuthController.registerUser);
router.post('/login', (0, validedRequest_1.default)(auth_validation_1.AuthValidation.userLoginZodSchema), auth_controller_1.AuthController.userLogin);
router.post('/refreshToken', (0, validedRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
router.post('/changePassword', (0, validedRequest_1.default)(auth_validation_1.AuthValidation.changePasswordZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
