import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyAdminToken(req: Request, res: Response, next: NextFunction) {
    req.body.session = { admin: null };
    
    try {
        const token = req.cookies.access_token;
        let data = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.body.session.admin = data;
    } catch {}

    next()
}