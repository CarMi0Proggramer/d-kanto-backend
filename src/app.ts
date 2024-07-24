import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { corsMiddleware } from "./middlewares/cors";
import { myDataSource } from "./app-data-source";
import { productsRouter } from "./routes/products";
import { adminsRouter } from "./routes/admins";
import { usersRouter } from "./routes/users";
import { purchasesRouter } from "./routes/purchases";
import { verifyAdminToken } from "./middlewares/verify_admin_token";
import { verifyUserToken } from "./middlewares/verify_user_token";

dotenv.config();
const port = process.env.PORT ?? 3000;

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.disable("x-powered-by");
/* middlewares */
app.use(express.json())
app.use(corsMiddleware())
app.use(cookieParser());
app.use(verifyAdminToken);
app.use(verifyUserToken);

/* setting routes */
app.use("/products", productsRouter);
app.use("/admins", adminsRouter);
app.use("/users", usersRouter);
app.use("/purchases", purchasesRouter);

// start express server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
