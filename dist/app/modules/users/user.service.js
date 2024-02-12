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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_model_1 = require("./user.model");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingle = (id, userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    if (userRole.toLowerCase() === 'customer' && userId !== id) {
        throw new ApiErrors_1.default(http_status_1.default.FORBIDDEN, 'You are not able to see others profile');
    }
    return result;
});
const updateSingle = (payload, id, userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    if (userRole.toLowerCase() === 'customer' && userId !== id) {
        throw new ApiErrors_1.default(http_status_1.default.FORBIDDEN, 'You are not able to update others profile');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const result = yield user_model_1.User.findOneAndDelete({ _id: id });
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'User not delete !');
    }
    return result;
});
exports.UserService = {
    getAll,
    getSingle,
    updateSingle,
    deleteUser,
};
