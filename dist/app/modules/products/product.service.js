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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const category_model_1 = require("../category/category.model");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidCategories = yield category_model_1.Category.exists({
        _id: { $in: payload.category },
    });
    if (!isValidCategories) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Provide valid category id');
    }
    const result = (yield product_model_1.Product.create(payload)).populate('category');
    return result;
});
const getAll = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: product_constant_1.fruitSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // if (Object.keys(filtersData).length) {
    //   andConditions.push({
    //     $and: Object.entries(filtersData).map(([field, value]) => ),
    //   });
    // }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                if (field === 'category') {
                    // Handle special case for 'category' field
                    return {
                        [field]: {
                            $in: [value], // Assuming the value is a single category, modify accordingly if it's an array
                        },
                    };
                }
                else {
                    // Handle other fields normally
                    return {
                        [field]: value,
                    };
                }
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield product_model_1.Product.find(whereConditions)
        .populate('category')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield product_model_1.Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id).populate('category');
    // .populate('reviews');
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found !');
    }
    return result;
});
const updateSingle = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_model_1.Product.findById(id);
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found !');
    }
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('category');
    // .populate('reviews');
    return result;
});
const deleteSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_model_1.Product.findById(id).populate('category');
    // .populate('reviews');
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found !');
    }
    const result = yield product_model_1.Product.findOneAndDelete({ _id: id });
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Product not delete !');
    }
    return result;
});
exports.ProductService = {
    getAll,
    getSingle,
    updateSingle,
    deleteSingle,
    create,
};
