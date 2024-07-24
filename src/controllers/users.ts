import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validatePartialUser, validateUser } from "../schemas/users.schema";
import { UserModel } from "../models/user";
import { signJWT } from "../functions/sign-jwt";

export class UserController {
    static async signIn(req: Request, res: Response){
        const result = validatePartialUser(req.body);
        if (!result.email) {
            return res.status(400).json(result);
        }

        try {
            const user = await UserModel.getByEmail(result.email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const passed = await bcrypt.compare(result.password, user.password);
            if (!passed) {
                return res.status(400).json({ message: "Invalid Password" });
            }

            /* SIGNING JWT */
            const token = signJWT({name: user.name, email: user.email});

            res.status(200).cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: "none",
                maxAge: 2000 * 60 * 60
            }).json({ name: user.name, email: user.email});
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    static async signUp( req: Request, res: Response){
        const result = validateUser(req.body);
        if (!result.email) {
            return res.status(400).json(result);
        }

        try {
            result.password = await bcrypt.hash(result.password, 10);

            const user = await UserModel.signUp(result);
            if (!user) {
                return res.status(400).json({ message: "Your email is already registered, try to sign in" });
            }

            /* SIGNING JWT */
            const token = signJWT({ name: user.name, email: user.email });

            res.status(201).cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: "lax",
                maxAge: 2000 * 60 * 60
            }).json({name: user.name, email: user.email});
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async logOut(req: Request, res: Response){
        res.clearCookie("access_token").json({ message: "Logged out successfully" });
    }

    static async isSignedIn(req: Request, res: Response) {
        try {
            const user = req.body.session.user;
            if (!user) {
                return res.status(403).json({ message: "User is not signed in" });
            }

            res.status(200).json({ message: "User is signed in" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}