"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = validateUser;
exports.validatePartialUser = validatePartialUser;
const zod_1 = __importDefault(require("zod"));
const userSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, { message: "Name is required" }),
    email: zod_1.default.string().email({ message: "Invalid email" }),
    password: zod_1.default.string().min(5, { message: "Password must be at least 5 characters" }),
});
function validateUser(data) {
    const result = userSchema.safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }
    return result.data;
}
function validatePartialUser(data) {
    const result = userSchema.partial().safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }
    return result.data;
}
//# sourceMappingURL=users.schema.js.map