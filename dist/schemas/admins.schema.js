"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSchema = void 0;
exports.validateAdmin = validateAdmin;
exports.validatePartialAdmin = validatePartialAdmin;
const zod_1 = __importDefault(require("zod"));
exports.adminSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, { message: "Name is required" }),
    email: zod_1.default.string().email({ message: "Invalid email" }),
    password: zod_1.default.string().min(5, { message: "Password must have at least 5 characters" }),
    company_key: zod_1.default.string().min(1, { message: "Company Password is required" })
});
function validateAdmin(data) {
    /* validating data */
    const result = exports.adminSchema.safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }
    else if (result.data.company_key != process.env.COMPANY_KEY) {
        return false;
    }
    return result.data;
}
function validatePartialAdmin(data) {
    /* validating partial data */
    const result = exports.adminSchema.partial().safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }
    else if (result.data.company_key != process.env.COMPANY_KEY) {
        return false;
    }
    return result.data;
}
//# sourceMappingURL=admins.schema.js.map