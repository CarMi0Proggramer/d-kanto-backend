import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyUserToken(req: Request, res: Response, next: NextFunction) {
    req.body.session = { user: null };
    
    try {
        const token = req.cookies.access_token;
        let data = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.body.session.user = data;
    } catch {}

    next()
}