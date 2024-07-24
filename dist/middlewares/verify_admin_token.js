"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = verifyAdminToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyAdminToken(req, res, next) {
    req.body.session = { admin: null };
    try {
        const token = req.cookies.access_token;
        let data = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_KEY);
        req.body.session.admin = data;
    }
    catch { }
    next();
}
//# sourceMappingURL=verify_admin_token.js.map