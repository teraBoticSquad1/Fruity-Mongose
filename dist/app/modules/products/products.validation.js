"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsValidation = void 0;
const zod_1 = require("zod");
const createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string({ required_error: 'Product code is required ' }),
        name: zod_1.z.string({ required_error: 'Product name is required ' }),
        description: zod_1.z.string({
            required_error: 'Product description is required',
        }),
        price: zod_1.z.number({ required_error: 'Product price is required' }),
        stock: zod_1.z.number({ required_error: 'Product stoke ' }),
        photo: zod_1.z.string({
            required_error: 'Products at least one photo is required',
        }),
        category: zod_1.z.string({ required_error: 'Category required' }).array(),
        gallery: zod_1.z.string().array().optional(),
    }),
});
exports.ProductsValidation = {
    createProductZodSchema,
};
