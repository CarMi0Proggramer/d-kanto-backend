
import { Request, Response } from "express"
import { ProductModel } from "../models/product";
import { productSchema } from "../schemas/products.schema";

export class ProductController  {
    static async getAll(req: Request, res: Response){
        try {
            const products = await ProductModel.getAll();
            if (products.length === 0) {
                res.status(404).json({message: "No products found"});
            }else{
                res.status(200).json(products);
            }
        } catch (error) {
            res.status(500).json({message: "Internal Server error"});
        }
    }

    static async getById( req: Request, res: Response){
        let { id } = req.params;
        try {
            const product = await ProductModel.getById(Number(id));
            if (!product) {
                res.status(404).json({message: "Product doesn't exist"});
            }else{
                res.status(200).json(product);
            }
        }catch(error){
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async create(req:Request, res: Response) {
        const result = productSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({message: JSON.parse(result.error.message)});
        }
        try {
            const product = await ProductModel.create(result.data);
            res.status(201).json(product);
        }catch(error){
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async delete(req: Request, res: Response) {
        let { id } = req.params;
        try {
            const result = await ProductModel.delete(Number(id));
            if (result.affected === 0) {
                res.status(404).json({message: "Product doesn't exist"});
            }else{
                res.status(204).send();
            }
        }catch(error){
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async update( req: Request, res: Response){
        const result = productSchema.partial().safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({message: JSON.parse(result.error.message)})
        }
        let { id } = req.params;
    
        try {
            const product = await ProductModel.update(Number(id), result.data);
            if (!product) {
                return res.status(404).json({message: "Product doesn't exist"});
            }
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({message: "Internal Server error"});
        }
    }
}