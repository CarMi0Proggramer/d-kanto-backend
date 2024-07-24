import { Request, Response } from "express";
import { AdminModel } from "../models/admin";
import { validateAdmin, validatePartialAdmin } from "../schemas/admins.schema";
import bcrypt from "bcrypt";
import { signJWT } from "../functions/sign-jwt";



export class AdminController {
    static async signUp(req: Request, res: Response) {
        /* VALIDATING DATA */
        const result = validateAdmin(req.body);
        if (result == false) {
            return res.status(400).json({ message: "Invalid Company Key" });
        }else if(!result.email){
            return res.status(400).json(result);
        }

        try {
            /* EXTRACTING DATA */
            let { name, password, email } = result;
            password = await bcrypt.hash(password, 10);

            /* SIGNING UP */
            const admin = await AdminModel.signUp({ name, email, password });

            /* IF ADMIN ALREADY EXISTS */
            if (!admin) {
                return res.status(400).json({ message: "Your email is already registered, try to sign in" });
            }

            res.status(201).json({name: admin.name, email: admin.email});
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async signIn(req: Request, res: Response) {
        /* PARSING DATA */
        const result = validatePartialAdmin(req.body);
        /* IF IT DOESN'T SUCCEED */
        if (result == false) {
            return res.status(400).json({ message: "Invalid Company Key" });
        } else if (!result.email) {
            return res.status(400).json(result);
        }

        try {
            /* EXTRACTING REQUIRED DATA */
            let { email, password } = result;

            /* LOOKING FOR THE ADMIN */
            const admin = await AdminModel.getByEmail({ email });
            /* IF THE ADMIN DOESN'T EXIST */
            if (!admin) {
                return res.status(404).json({ message: "Not found" });
            }

            /* COMPARING PASSWORDS */
            const passed = await bcrypt.compare(password, admin.password);
            if (!passed) {
                return res.status(400).json({ message: "Invalid Password" });
            }

            /* SIGNING JWT */
            const token = signJWT({ name: admin.name, email: admin.email });

            res.status(200).cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: "lax",
                maxAge: 2000 * 60 * 60
            }).json({ name: admin.name, email: admin.email});
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async logOut(req: Request, res: Response){
        res.clearCookie("access_token").json({ message: "Logged out successfuly"});
    }
}
