import { Router } from "express";
import { PurchaseController } from "../controllers/purchases";

export const purchasesRouter = Router();

purchasesRouter.get("/", PurchaseController.getAll)

purchasesRouter.post("/create-checkout-session", PurchaseController.createCheckoutSession);

purchasesRouter.post("/save-payment", PurchaseController.savePayment);