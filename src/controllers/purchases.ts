import { Request, Response } from "express";
import { validatePartialPurchaseData, validatePurchaseData } from "../schemas/purchases.schema";
import { PurchaseModel } from "../models/purchase";
import { createCheckoutSession } from "../functions/create-checkout-session";

export class PurchaseController {
    static async getAll(req: Request, res: Response){
        const user = req.body.session.user;
        if (!user) {
            return res.status(403).json({ message: "Access not authorized" });
        }
        
        try {
            const purchases = await PurchaseModel.getAll();
            if (purchases.length === 0) {
                res.status(404).json({message: "No purchases found"});
            }else{
                res.status(200).json(purchases);
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async createCheckoutSession(req: Request, res: Response) {
        const user = req.body.session.user;
        if (!user) {
            return res.status(403).json({ message: "Access not authorized" });
        }

        const data = validatePartialPurchaseData(req.body);
        if (!data.lineItems) {
            return res.status(400).json(data);
        }

        try {
            const session = await createCheckoutSession( data.lineItems );
            console.log(session);
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async savePayment(req: Request, res: Response) {
        const user = req.body.session.user;
        if (!user) {
            return res.status(403).json({ message: "Access not authorized" });
        }

        const data = validatePurchaseData(req.body);
        if (!data.lineItems) {
            return res.status(400).json(data);
        }

        try {
            await PurchaseModel.create(user.email, data.lineItems, data.total_amount);
            res.status(200).json({ message: "Success" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}