"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = require("./middlewares/cors");
const app_data_source_1 = require("./app-data-source");
const products_1 = require("./routes/products");
const admins_1 = require("./routes/admins");
const users_1 = require("./routes/users");
const purchases_1 = require("./routes/purchases");
const verify_admin_token_1 = require("./middlewares/verify_admin_token");
const verify_user_token_1 = require("./middlewares/verify_user_token");
dotenv_1.default.config();
const port = process.env.PORT ?? 3000;
// establish database connection
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
const app = (0, express_1.default)();
app.disable("x-powered-by");
/* middlewares */
app.use(express_1.default.json());
app.use((0, cors_1.corsMiddleware)());
app.use((0, cookie_parser_1.default)());
app.use(verify_admin_token_1.verifyAdminToken);
app.use(verify_user_token_1.verifyUserToken);
/* setting routes */
app.use("/products", products_1.productsRouter);
app.use("/admins", admins_1.adminsRouter);
app.use("/users", users_1.usersRouter);
app.use("/purchases", purchases_1.purchasesRouter);
// start express server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
//# sourceMappingURL=app.js.map