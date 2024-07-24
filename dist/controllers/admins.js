"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_1 = require("../models/admin");
const admins_schema_1 = require("../schemas/admins.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sign_jwt_1 = require("../functions/sign-jwt");
class AdminController {
    static async signUp(req, res) {
        /* VALIDATING DATA */
        const result = (0, admins_schema_1.validateAdmin)(req.body);
        if (result == false) {
            return res.status(400).json({ message: "Invalid Company Key" });
        }
        else if (!result.email) {
            return res.status(400).json(result);
        }
        try {
            /* EXTRACTING DATA */
            let { name, password, email } = result;
            password = await bcrypt_1.default.hash(password, 10);
            /* SIGNING UP */
            const admin = await admin_1.AdminModel.signUp({ name, email, password });
            /* IF ADMIN ALREADY EXISTS */
            if (!admin) {
                return res.status(400).json({ message: "Your email is already registered, try to sign in" });
            }
            res.status(201).json({ name: admin.name, email: admin.email });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async signIn(req, res) {
        /* PARSING DATA */
        const result = (0, admins_schema_1.validatePartialAdmin)(req.body);
        /* IF IT DOESN'T SUCCEED */
        if (result == false) {
            return res.status(400).json({ message: "Invalid Company Key" });
        }
        else if (!result.email) {
            return res.status(400).json(result);
        }
        try {
            /* EXTRACTING REQUIRED DATA */
            let { email, password } = result;
            /* LOOKING FOR THE ADMIN */
            const admin = await admin_1.AdminModel.getByEmail({ email });
            /* IF THE ADMIN DOESN'T EXIST */
            if (!admin) {
                return res.status(404).json({ message: "Not found" });
            }
            /* COMPARING PASSWORDS */
            const passed = await bcrypt_1.default.compare(password, admin.password);
            if (!passed) {
                return res.status(400).json({ message: "Invalid Password" });
            }
            /* SIGNING JWT */
            const token = (0, sign_jwt_1.signJWT)({ name: admin.name, email: admin.email });
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: "lax",
                maxAge: 2000 * 60 * 60
            }).json({ name: admin.name, email: admin.email });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async logOut(req, res) {
        res.clearCookie("access_token").json({ message: "Logged out successfuly" });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admins.js.map