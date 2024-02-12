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
exports.CategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const category_model_1 = require("./category.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(payload);
    return result;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.find();
    return result;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id);
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Category not found !');
    }
    return result;
});
const updateSingle = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Category not found !');
    }
    const result = yield category_model_1.Category.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Category not found !');
    }
    const result = yield category_model_1.Category.findOneAndDelete({ _id: id });
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Category not delete !');
    }
    return result;
});
exports.CategoryService = {
    getAll,
    getSingle,
    updateSingle,
    deleteSingle,
    create,
};
