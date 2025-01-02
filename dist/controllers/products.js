"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_1 = require("../models/product");
const products_schema_1 = require("../schemas/products.schema");
class ProductController {
    static async getAll(req, res) {
        try {
            const products = await product_1.ProductModel.getAll();
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server error" });
        }
    }
    static async getById(req, res) {
        let { id } = req.params;
        try {
            const product = await product_1.ProductModel.getById(Number(id));
            if (!product) {
                res.status(404).json({ message: "Product doesn't exist" });
            }
            else {
                res.status(200).json(product);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async create(req, res) {
        const data = (0, products_schema_1.validateProduct)(req.body);
        if (!data.name) {
            return res.status(400).json({ message: data });
        }
        try {
            const product = await product_1.ProductModel.create(data);
            res.status(201).json(product);
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
    static async delete(req, res) {
        let { id } = req.params;
        try {
            const result = await product_1.ProductModel.delete(Number(id));
            if (result.affected === 0) {
                res.status(404).json({ message: "Product doesn't exist" });
            }
            else {
                res.status(204).send();
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async update(req, res) {
        const data = (0, products_schema_1.validatePartialProduct)(req.body);
        if (!data.name) {
            return res.status(400).json({ message: data });
        }
        let { id } = req.params;
        try {
            const product = await product_1.ProductModel.update(Number(id), data);
            if (!product) {
                return res
                    .status(404)
                    .json({ message: "Product doesn't exist" });
            }
            res.status(200).json(product);
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server error" });
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=products.js.map