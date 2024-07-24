"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePurchaseData = validatePurchaseData;
exports.validatePartialPurchaseData = validatePartialPurchaseData;
const zod_1 = __importDefault(require("zod"));
const lineItemSchema = zod_1.default.object({
    data: zod_1.default.object({
        id: zod_1.default.number().positive(),
        name: zod_1.default.string(),
        price: zod_1.default.number().positive(),
        description: zod_1.default.string(),
        urlimg: zod_1.default.string().url(),
        category: zod_1.default.string(),
        rating: zod_1.default.number().positive(),
        stock: zod_1.default.number(),
    }),
    quantity: zod_1.default.number().positive()
});
const purchaseSchema = zod_1.default.object({
    lineItems: zod_1.default.array(lineItemSchema),
    total_amount: zod_1.default.number().positive()
});
function validatePurchaseData(data) {
    const result = purchaseSchema.safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }
    return result.data;
}
function validatePartialPurchaseData(data) {
    const result = purchaseSchema.partial().safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }
    return result.data;
}
//# sourceMappingURL=purchases.schema.js.map