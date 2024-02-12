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
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const review_model_1 = require("./review.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(payload);
    return result;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find().populate('user').populate('product');
    return result;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findById(id).populate('user').populate('product');
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Review not found !');
    }
    return result;
});
const updateSingle = (userId, role, payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield review_model_1.Review.findById(id);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Review not found !');
    }
    if (role === user_1.ENUM_USER_ROLE.ADMIN || role === user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield review_model_1.Review.findOneAndUpdate({ _id: id }, payload, {
            new: true,
        });
        return result;
    }
    else {
        if (isExist.user.toString() !== userId) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Invalid user request ');
        }
        const result = yield review_model_1.Review.findOneAndUpdate({ _id: id }, payload, {
            new: true,
        });
        return result;
    }
});
const deleteSingle = (userId, role, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield review_model_1.Review.findById(id);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Review not found !');
    }
    if (role === user_1.ENUM_USER_ROLE.ADMIN || role === user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield review_model_1.Review.findOneAndDelete({ _id: id });
        if (!result) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Review not delete !');
        }
        return result;
    }
    else {
        if (isExist.user.toString() !== userId) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Invalid user request ');
        }
        const result = yield review_model_1.Review.findOneAndDelete({ _id: id });
        if (!result) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Review not delete !');
        }
        return result;
    }
});
exports.ReviewService = {
    create,
    getAll,
    getSingle,
    updateSingle,
    deleteSingle,
};
