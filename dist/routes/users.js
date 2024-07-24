"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
exports.usersRouter = (0, express_1.Router)();
/* SIGNING UP AN USER */
exports.usersRouter.post("/signUp", users_1.UserController.signUp);
/* SIGNING IN AN USER */
exports.usersRouter.post("/signIn", users_1.UserController.signIn);
/* LOGGING OUT AN USER */
exports.usersRouter.post("/logOut", users_1.UserController.logOut);
/* GETTING IF A USER IS SIGNED IN */
exports.usersRouter.get("/isSignedIn", users_1.UserController.isSignedIn);
//# sourceMappingURL=users.js.map