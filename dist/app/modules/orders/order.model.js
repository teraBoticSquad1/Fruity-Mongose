"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    products: [
        {
            product: {
                type: mongoose_1.Types.ObjectId,
                ref: 'Product',
            },
            quantity: Number,
            price: Number,
        },
    ],
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    subTotal: {
        type: Number,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    shippingFee: {
        type: Number,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Online Payment', 'Cash on delivery'],
        required: true,
    },
    status: {
        type: String,
        enum: [
            'Not Processed',
            'Processing',
            'Shipped',
            'Cancelled',
            'Delivered',
        ],
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Order = (0, mongoose_1.model)('Order', exports.orderSchema);
