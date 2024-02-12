"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.reviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.reviewSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Review = (0, mongoose_1.model)('Review', exports.reviewSchema);
