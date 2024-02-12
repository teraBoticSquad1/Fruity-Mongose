"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    gallery: [
        {
            type: String,
            required: true,
        },
    ],
    category: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Category',
        },
    ],
    reviews: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Review',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Product = (0, mongoose_1.model)('Product', exports.productSchema);
