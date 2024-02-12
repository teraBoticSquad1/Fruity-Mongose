"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderZodValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const addOrderZodValidation = zod_1.default.object({
    body: zod_1.default.object({
        cartId: zod_1.default.string({ required_error: 'Cart id is required ' }),
        shippingFee: zod_1.default.number({ required_error: 'Shipping fee is required ' }),
        shippingAddress: zod_1.default.string({ required_error: 'Address is required ' }),
        contact: zod_1.default.string({ required_error: 'Contact is required ' }),
        paymentMethod: zod_1.default.string({ required_error: 'Payment method is required ' }),
    }),
});
exports.OrderZodValidation = {
    addOrderZodValidation,
};
