"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get('/', review_controller_1.ReviewController.getAll);
router.post('/create', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.SUPER_ADMIN), review_controller_1.ReviewController.createSingle);
router.put('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.ReviewController.updateSingle);
router.get('/:id', review_controller_1.ReviewController.getSingle);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.ReviewController.deleteSingle);
exports.ReviewRoutes = router;
