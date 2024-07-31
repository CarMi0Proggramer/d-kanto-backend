import { myDataSource } from "../app-data-source";
import { Product } from "../entity/product.entity";

export class ProductModel {
    static async getAll(){
        const products = await myDataSource.getRepository(Product).find();
        return products;
    }

    static async getById(id: number){
        const product = await myDataSource.getRepository(Product).findOneBy({id: id});
        return product;
    }

    static async create(data: any){
        const product = await myDataSource.getRepository(Product).save(data);
        return product;
    }

    static async delete(id: number){
        const result = await myDataSource.getRepository(Product).delete({id: id});
        return result;
    }

    static async update(id: number, data: any){
        const productRepository = myDataSource.getRepository(Product);

        const product = await this.getById(id);
        if (!product) {
            return false;
        }
        await productRepository.update({id: id}, data);

        const updatedProduct = await this.getById(id);
        return updatedProduct;
    }
}