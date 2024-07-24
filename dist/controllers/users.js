"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_schema_1 = require("../schemas/users.schema");
const user_1 = require("../models/user");
const sign_jwt_1 = require("../functions/sign-jwt");
class UserController {
    static async signIn(req, res) {
        const result = (0, users_schema_1.validatePartialUser)(req.body);
        if (!result.email) {
            return res.status(400).json(result);
        }
        try {
            const user = await user_1.UserModel.getByEmail(result.email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const passed = await bcrypt_1.default.compare(result.password, user.password);
            if (!passed) {
                return res.status(400).json({ message: "Invalid Password" });
            }
            /* SIGNING JWT */
            const token = (0, sign_jwt_1.signJWT)({ name: user.name, email: user.email });
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: "lax",
                maxAge: 2000 * 60 * 60
            }).json({ name: user.name, email: user.email });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async signUp(req, res) {
        const result = (0, users_schema_1.validateUser)(req.body);
        if (!result.email) {
            return res.status(400).json(result);
        }
        try {
            result.password = await bcrypt_1.default.hash(result.password, 10);
            const user = await user_1.UserModel.signUp(result);
            if (!user) {
                return res.status(400).json({ message: "Your email is already registered, try to sign in" });
            }
            /* SIGNING JWT */
            const token = (0, sign_jwt_1.signJWT)({ name: user.name, email: user.email });
            res.status(201).cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: "lax",
                maxAge: 2000 * 60 * 60
            }).json({ name: user.name, email: user.email });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async logOut(req, res) {
        res.clearCookie("access_token").json({ message: "Logged out successfully" });
    }
    static async isSignedIn(req, res) {
        try {
            const user = req.body.session.user;
            if (!user) {
                return res.status(403).json({ message: "User is not signed in" });
            }
            res.status(200).json({ message: "User is signed in" });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=users.js.map