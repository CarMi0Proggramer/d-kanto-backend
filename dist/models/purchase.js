"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const app_data_source_1 = require("../app-data-source");
const purchase_entity_1 = require("../entity/purchase.entity");
const create_purchase_products_1 = require("../functions/create-purchase-products");
const save_purchase_products_1 = require("../functions/save-purchase-products");
const user_1 = require("./user");
class PurchaseModel {
    static async getAll() {
        const purchases = await app_data_source_1.myDataSource.getRepository(purchase_entity_1.Purchase).find();
        return purchases;
    }
    static async create(userEmail, items, total_amount) {
        const user = await user_1.UserModel.getByEmail(userEmail);
        const purchase = new purchase_entity_1.Purchase();
        purchase.user = user;
        purchase.total_amount = total_amount;
        const purchaseProducts = (0, create_purchase_products_1.createPurchaseProducts)(items, purchase);
        purchase.purchaseProducts = purchaseProducts;
        await app_data_source_1.myDataSource.getRepository(purchase_entity_1.Purchase).save(purchase);
        (0, save_purchase_products_1.savePurchaseProducts)(purchaseProducts);
        return purchase;
    }
}
exports.PurchaseModel = PurchaseModel;
//# sourceMappingURL=purchase.js.map