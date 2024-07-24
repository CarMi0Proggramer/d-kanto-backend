import { Router } from "express";
import { UserController } from "../controllers/users";

export const usersRouter = Router();

/* SIGNING UP AN USER */
usersRouter.post("/signUp", UserController.signUp);

/* SIGNING IN AN USER */
usersRouter.post("/signIn", UserController.signIn);

/* LOGGING OUT AN USER */
usersRouter.post("/logOut", UserController.logOut);

/* GETTING IF A USER IS SIGNED IN */
usersRouter.get("/isSignedIn", UserController.isSignedIn);