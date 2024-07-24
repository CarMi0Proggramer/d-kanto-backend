"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = signJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJWT(data) {
    const token = jsonwebtoken_1.default.sign(data, process.env.SECRET_JWT_KEY, {
        expiresIn: "2h",
    });
    return token;
}
//# sourceMappingURL=sign-jwt.js.map