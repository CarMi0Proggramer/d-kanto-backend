"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePurchaseProducts = savePurchaseProducts;
const app_data_source_1 = require("../app-data-source");
const purchase_product_entity_1 = require("../entity/purchase-product.entity");
async function savePurchaseProducts(purchaseProducts) {
    const repository = app_data_source_1.myDataSource.getRepository(purchase_product_entity_1.PurchaseProduct);
    for (const purchaseProduct of purchaseProducts) {
        repository.save(purchaseProduct);
    }
}
//# sourceMappingURL=save-purchase-products.js.map