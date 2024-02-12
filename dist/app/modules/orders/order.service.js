"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importStar(require("mongoose"));
const user_1 = require("../../../enums/user");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const cart_model_1 = require("../cart/cart.model");
const order_constant_1 = require("./order.constant");
const order_model_1 = require("./order.model");
const addOrder = (userID, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { cartId, shippingFee, shippingAddress, contact, paymentMethod } = payload;
    const isCartExist = yield cart_model_1.Cart.findById(cartId);
    if (!isCartExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Cart info not found ❌');
    }
    if ((isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.user.toString()) !== userID) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Invalid User request ❌ ');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const subTotal = (_a = isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.products) === null || _a === void 0 ? void 0 : _a.reduce((total, product) => total + product.price * product.quantity, 0);
        const totalCost = subTotal + shippingFee;
        const orderInfo = {
            products: isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.products,
            subTotal: Number(subTotal),
            totalCost: totalCost,
            shippingFee: shippingFee,
            shippingAddress: shippingAddress,
            user: new mongoose_1.Types.ObjectId(userID),
            contact: contact,
            paymentMethod: paymentMethod,
            status: 'Not Processed',
        };
        const addOrderDb = yield order_model_1.Order.create(orderInfo);
        if (!addOrderDb) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Order not create');
        }
        const removeCart = yield cart_model_1.Cart.findOneAndDelete(cartId);
        if (!removeCart) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Order not create');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return addOrderDb;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const updateOrder = (userRole, userId, orderId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExist = yield order_model_1.Order.findById(orderId);
    if (!isOrderExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Order not exist 📌');
    }
    if (userRole === user_1.ENUM_USER_ROLE.ADMIN ||
        userRole === user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield order_model_1.Order.findByIdAndUpdate(orderId, payload);
        return result;
    }
    else {
        if ((payload === null || payload === void 0 ? void 0 : payload.status) !== 'Cancelled') {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'You are not able to update status');
        }
        if ((isOrderExist === null || isOrderExist === void 0 ? void 0 : isOrderExist.status) === 'Cancelled') {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Order already canceled');
        }
        const result = yield order_model_1.Order.findByIdAndUpdate(orderId, {
            status: payload.status,
        });
        return result;
    }
});
const getSingleUserAllOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ user: userId });
    return result;
});
const getAllOrder = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: order_constant_1.orderSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                // Handle other fields normally
                return {
                    [field]: value,
                };
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield order_model_1.Order.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Order.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleOrderDetails = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(orderId);
    return result;
});
exports.OrderService = {
    addOrder,
    updateOrder,
    getAllOrder,
    getSingleUserAllOrder,
    getSingleOrderDetails,
};
