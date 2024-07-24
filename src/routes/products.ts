import { Router } from "express";
import { ProductController } from "../controllers/products";

export const productsRouter = Router();

//getting all products
productsRouter.get('/', ProductController.getAll);

//getting one product by name
productsRouter.get('/:id', ProductController.getById)

//creating a product
productsRouter.post("/", ProductController.create);

//deleting a product by name
productsRouter.delete("/:id",ProductController.delete)

//updating a product by name
productsRouter.patch('/:id', ProductController.update)