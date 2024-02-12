"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.cartSchema = void 0;
const mongoose_1 = require("mongoose");
exports.cartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose_1.Types.ObjectId,
                required: true,
            },
            price: { type: Number },
            quantity: { type: Number, default: 1 },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cart = (0, mongoose_1.model)('Cart', exports.cartSchema);
