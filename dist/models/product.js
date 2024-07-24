"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const app_data_source_1 = require("../app-data-source");
const product_entity_1 = require("../entity/product.entity");
class ProductModel {
    static async getAll() {
        const products = await app_data_source_1.myDataSource.getRepository(product_entity_1.Product).find();
        return products;
    }
    static async getById(id) {
        const product = await app_data_source_1.myDataSource.getRepository(product_entity_1.Product).findOne({ where: { id: id } });
        return product;
    }
    static async create(data) {
        const product = await app_data_source_1.myDataSource.getRepository(product_entity_1.Product).save(data);
        return product;
    }
    static async delete(id) {
        const result = await app_data_source_1.myDataSource.getRepository(product_entity_1.Product).delete({ id: id });
        return result;
    }
    static async update(id, data) {
        const productRepository = app_data_source_1.myDataSource.getRepository(product_entity_1.Product);
        const product = await productRepository.findOne({ where: { id: id } });
        if (!product) {
            return false;
        }
        await productRepository.update({ id: id }, data);
        const updatedProduct = await productRepository.findOne({ where: { id: id } });
        return updatedProduct;
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.js.map