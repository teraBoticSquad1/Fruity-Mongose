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
exports.CartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../../../enums/user");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const product_model_1 = require("../products/product.model");
const user_model_1 = require("./../users/user.model");
const cart_model_1 = require("./cart.model");
const productAddToCart = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = payload;
    const isValidUser = yield user_model_1.User.findById(userId);
    if (!isValidUser) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isValidProduct = yield product_model_1.Product.findById(productId);
    if (!isValidProduct) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found ❌');
    }
    const cartInfo = yield cart_model_1.Cart.findOne({ user: userId });
    if (cartInfo) {
        const existingProductIndex = cartInfo.products.findIndex(p => p.product.toString() === productId);
        if (existingProductIndex !== -1) {
            // Product already exists in the cart, increment quantity
            cartInfo.products[existingProductIndex].quantity += 1;
            cartInfo.products[existingProductIndex].price = isValidProduct === null || isValidProduct === void 0 ? void 0 : isValidProduct.price;
        }
        else {
            // Product not in the cart, add a new entry
            cartInfo.products.push({
                product: new mongoose_1.default.Types.ObjectId(productId),
                price: isValidProduct === null || isValidProduct === void 0 ? void 0 : isValidProduct.price,
                quantity: 1,
            });
        }
        // Update the cart directly
        const result = yield cart_model_1.Cart.updateOne({ user: userId }, { $set: { products: cartInfo.products } });
        if ((result === null || result === void 0 ? void 0 : result.modifiedCount) === 0 || result.matchedCount === 0) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_MODIFIED, 'Cart is not update❌');
        }
        const res = yield cart_model_1.Cart.findOne({ user: userId });
        return res;
    }
    else {
        // Create a new cart using updateOne
        const result = yield cart_model_1.Cart.updateOne({ user: userId }, {
            $setOnInsert: {
                user: userId,
            },
            $push: {
                products: {
                    product: new mongoose_1.default.Types.ObjectId(productId),
                    price: isValidProduct.price,
                    quantity: 1,
                },
            },
            new: true,
        }, { upsert: true }
        // Create a new document if it doesn't exist
        );
        if (!result) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_MODIFIED, 'Cart is not update❌');
        }
    }
    const res = yield cart_model_1.Cart.findOne({ user: userId });
    return res;
});
const removeFromCart = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = payload;
    const isValidUser = yield user_model_1.User.findById(userId);
    if (!isValidUser) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isValidProduct = yield product_model_1.Product.findById(productId);
    if (!isValidProduct) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const cartInfo = yield cart_model_1.Cart.findOne({ user: userId });
    if (cartInfo) {
        const indexToRemove = cartInfo.products.findIndex(p => p.product.toString() === productId);
        if (indexToRemove !== -1) {
            // Product already exists in the cart, decrement quantity
            if (cartInfo.products[indexToRemove].quantity === 1) {
                cartInfo.products.splice(indexToRemove, 1);
                yield cartInfo.save();
            }
            else {
                cartInfo.products[indexToRemove].quantity -= 1;
            }
            // Update the cart directly
            const result = yield cart_model_1.Cart.updateOne({ user: userId }, { $set: { products: cartInfo.products } }, { new: true });
            if ((result === null || result === void 0 ? void 0 : result.modifiedCount) === 0 || result.matchedCount === 0) {
                throw new ApiErrors_1.default(http_status_1.default.NOT_MODIFIED, 'Cart is not update❌');
            }
        }
        else {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found in the cart ');
        }
    }
    else {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User cart not found !');
    }
    const result = yield cart_model_1.Cart.findOne({ user: userId });
    return result;
});
const deleteProductFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidUser = yield user_model_1.User.findById(userId);
    if (!isValidUser) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isValidProduct = yield product_model_1.Product.findById(productId);
    if (!isValidProduct) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const cartInfo = yield cart_model_1.Cart.findOne({ user: userId });
    if (cartInfo) {
        const indexToRemove = cartInfo.products.findIndex(p => p.product.toString() === productId);
        if (indexToRemove !== -1) {
            cartInfo.products.splice(indexToRemove, 1);
            yield cartInfo.save();
            // Update the cart directly
            const result = yield cart_model_1.Cart.updateOne({ user: userId }, { $set: { products: cartInfo.products } }, { new: true });
            if ((result === null || result === void 0 ? void 0 : result.modifiedCount) === 0 || result.matchedCount === 0) {
                throw new ApiErrors_1.default(http_status_1.default.NOT_MODIFIED, 'Cart is not update❌');
            }
        }
        else {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Product not found in the cart ');
        }
    }
    else {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User cart not found !');
    }
    const result = yield cart_model_1.Cart.findOne({ user: userId });
    return result;
});
const getCartInfo = (userRole, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (userRole === user_1.ENUM_USER_ROLE.ADMIN) {
        const result = yield cart_model_1.Cart.find();
        return result;
    }
    else {
        const result = yield cart_model_1.Cart.findOne({ user: userId });
        return result;
    }
});
const getSingleCartInfo = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findById(cartId);
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Cart Not found 😪');
    }
    return result;
});
exports.CartService = {
    productAddToCart,
    removeFromCart,
    deleteProductFromCart,
    getCartInfo,
    getSingleCartInfo,
};
