"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasesRouter = void 0;
const express_1 = require("express");
const purchases_1 = require("../controllers/purchases");
exports.purchasesRouter = (0, express_1.Router)();
exports.purchasesRouter.get("/", purchases_1.PurchaseController.getAll);
exports.purchasesRouter.post("/create-checkout-session", purchases_1.PurchaseController.createCheckoutSession);
exports.purchasesRouter.post("/save-payment", purchases_1.PurchaseController.savePayment);
//# sourceMappingURL=purchases.js.map