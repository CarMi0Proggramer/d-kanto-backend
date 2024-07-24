"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsRouter = void 0;
const express_1 = require("express");
const admins_1 = require("../controllers/admins");
exports.adminsRouter = (0, express_1.Router)();
/* SIGNING UP AN ADMIN */
exports.adminsRouter.post("/signUp", admins_1.AdminController.signUp);
/* SIGNING AN ADMIN */
exports.adminsRouter.post("/signIn", admins_1.AdminController.signIn);
/* LOGGING OUT AN ADMIN */
exports.adminsRouter.post("/logOut", admins_1.AdminController.logOut);
//# sourceMappingURL=admins.js.map