"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        userName: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = { updateUserZodSchema };
