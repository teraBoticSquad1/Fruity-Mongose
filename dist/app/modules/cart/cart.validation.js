"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const addToCartZodValidation = zod_1.default.object({
    body: zod_1.default.object({
        productId: zod_1.default.string({ required_error: 'Product id is required' }),
    }),
});
const removeFromCartZodValidation = zod_1.default.object({
    body: zod_1.default.object({
        productId: zod_1.default.string({ required_error: 'Product id is required' }),
    }),
});
exports.CartValidation = {
    addToCartZodValidation,
    removeFromCartZodValidation,
};
