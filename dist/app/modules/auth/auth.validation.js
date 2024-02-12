"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const auth_constant_1 = require("./auth.constant");
const registerUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...auth_constant_1.userRole], {
            required_error: 'Role is required',
        }),
        email: zod_1.z.string({ required_error: 'Email is required ' }),
        password: zod_1.z.string({ required_error: 'Password is required ' }),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        userName: zod_1.z.string({ required_error: 'User name is required ' }),
        address: zod_1.z.string().optional(),
    }),
});
const userLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required ' }),
        password: zod_1.z.string({ required_error: 'Password is required ' }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh Token is required' }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old password is required ' }),
        newPassword: zod_1.z.string({ required_error: 'New password is required ' }),
    }),
});
exports.AuthValidation = {
    registerUserZodSchema,
    userLoginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema,
};
