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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const checkEmailFormateValidity_1 = require("../../../helpers/checkEmailFormateValidity");
const checkPasswordStrength_1 = require("../../../helpers/checkPasswordStrength");
const encription_1 = require("../../../helpers/encription");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../users/user.model");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, othersData = __rest(payload, ["password"]);
    //check email formate validity
    if (!(0, checkEmailFormateValidity_1.validateEmail)(othersData.email)) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Email formate is not valid');
    }
    // password validity check
    const passwordValidity = (0, checkPasswordStrength_1.checkPasswordStrength)(othersData.email, password);
    if (!passwordValidity.validity) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, passwordValidity.msg);
    }
    const result = yield user_model_1.User.create(payload);
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not created');
    }
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const result = yield user_model_1.User.findOne({ email: email }).select('+password');
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const isMatched = yield (0, encription_1.isPasswordMatched)(password, result === null || result === void 0 ? void 0 : result.password);
    if (!isMatched) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Password is not matched');
    }
    // create user access token and refresh token
    const { id, role } = result;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, role, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, role, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiErrors_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id } = verifiedToken;
    const isUserExist = yield user_model_1.User.findById(id);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist.id, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_model_1.User.findById(userId).select('+password');
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isMatched = yield (0, encription_1.isPasswordMatched)(oldPassword, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isMatched) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Password is not matched');
    }
    // password validity check
    const passwordValidity = (0, checkPasswordStrength_1.checkPasswordStrength)(isUserExist.email, newPassword);
    if (!passwordValidity.validity) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, passwordValidity.msg);
    }
    isUserExist.password = newPassword;
    isUserExist.save();
    return isUserExist;
});
exports.AuthServices = {
    registerUser,
    loginUser,
    refreshToken,
    changePassword,
};
