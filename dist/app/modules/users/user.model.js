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
exports.User = exports.userSchema = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
exports.userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    firstName: {
        type: String,
        // required: false,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
        // required: false,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default: null,
        // required: false,
    },
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    myReviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.password; // Exclude password field from the response
        },
    },
});
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing password
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
