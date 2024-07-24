"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    price: zod_1.z
        .number()
        .positive({ message: "Price must be a positive number" })
        .max(10000, { message: "Price must be less than 10000" }),
    description: zod_1.z.string().min(50, { message: "Description must be at least of 50 characters" }),
    urlimg: zod_1.z.string().url({ message: "Invalid URL" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    rating: zod_1.z
        .number()
        .min(0)
        .max(5, { message: "Rating must be between 0 and 5" }).default(5),
    stock: zod_1.z.number().positive({ message: "Stock must be a positive number" }).min(1, { message: "Stock must be at least 1" })
});
//# sourceMappingURL=products.schema.js.map