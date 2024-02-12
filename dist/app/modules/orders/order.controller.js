"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationFields_1 = require("../../../constants/paginationFields");
const user_1 = require("../../../enums/user");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_constant_1 = require("./order.constant");
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield order_service_1.OrderService.addOrder(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order placed success ✅ ',
        data: result,
    });
}));
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { orderId } = req.params;
    const result = yield order_service_1.OrderService.updateOrder(role, id, orderId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order update successfully ✅ ',
        data: result,
    });
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, order_constant_1.orderFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const { role, id } = req.user;
    if (role === user_1.ENUM_USER_ROLE.ADMIN || role === user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield order_service_1.OrderService.getAllOrder(filters, paginationOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order retrieve successfully ✅ ',
            data: result,
        });
    }
    else {
        const result = yield order_service_1.OrderService.getSingleUserAllOrder(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order retrieve successfully ✅',
            data: result,
        });
    }
}));
const getSingleOrderDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getSingleOrderDetails(req.params.orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrieve successfully ✅ ',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    updateOrder,
    getAllOrder,
    getSingleOrderDetails,
};
