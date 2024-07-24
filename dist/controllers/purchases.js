"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const purchases_schema_1 = require("../schemas/purchases.schema");
const purchase_1 = require("../models/purchase");
const create_checkout_session_1 = require("../functions/create-checkout-session");
class PurchaseController {
    static async getAll(req, res) {
        const user = req.body.session.user;
        if (!user) {
            return res.status(403).json({ message: "Access not authorized" });
        }
        try {
            const purchases = await purchase_1.PurchaseModel.getAll();
            if (purchases.length === 0) {
                res.status(404).json({ message: "No purchases found" });
            }
            else {
                res.status(200).json(purchases);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async createCheckoutSession(req, res) {
        const user = req.body.session.user;
        if (!user) {
            return res.status(403).json({ message: "Access not authorized" });
        }
        const data = (0, purchases_schema_1.validatePartialPurchaseData)(req.body);
        if (!data.lineItems) {
            return res.status(400).json(data);
        }
        try {
            const session = await (0, create_checkout_session_1.createCheckoutSession)(data.lineItems);
            res.status(200).json(session);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async savePayment(req, res) {
        const user = req.body.session.user;
        if (!user) {
            return res.status(403).json({ message: "Access not authorized" });
        }
        const data = (0, purchases_schema_1.validatePurchaseData)(req.body);
        if (!data.lineItems) {
            return res.status(400).json(data);
        }
        try {
            await purchase_1.PurchaseModel.create(user.email, data.lineItems, data.total_amount);
            res.status(200).json({ message: "Success" });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchases.js.map