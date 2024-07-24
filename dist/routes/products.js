"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_1 = require("../controllers/products");
exports.productsRouter = (0, express_1.Router)();
//getting all products
exports.productsRouter.get('/', products_1.ProductController.getAll);
//getting one product by name
exports.productsRouter.get('/:id', products_1.ProductController.getById);
//creating a product
exports.productsRouter.post("/", products_1.ProductController.create);
//deleting a product by name
exports.productsRouter.delete("/:id", products_1.ProductController.delete);
//updating a product by name
exports.productsRouter.patch('/:id', products_1.ProductController.update);
//# sourceMappingURL=products.js.map