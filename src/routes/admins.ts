import { Router } from "express";
import { AdminController } from "../controllers/admins";

export const adminsRouter = Router();

/* SIGNING UP AN ADMIN */
adminsRouter.post("/signUp", AdminController.signUp);

/* SIGNING AN ADMIN */
adminsRouter.post("/signIn", AdminController.signIn);

/* LOGGING OUT AN ADMIN */
adminsRouter.post("/logOut", AdminController.logOut);