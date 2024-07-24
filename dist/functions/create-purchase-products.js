"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchaseProducts = createPurchaseProducts;
const purchase_product_entity_1 = require("../entity/purchase-product.entity");
function createPurchaseProducts(items, purchase) {
    return items.map(item => {
        const purchaseProduct = new purchase_product_entity_1.PurchaseProduct();
        purchaseProduct.product = item.data;
        purchaseProduct.purchase = purchase;
        purchaseProduct.quantity = item.quantity;
        purchaseProduct.totalPrice = Math.round((item.quantity * item.data.price) * 100) / 100;
        return purchaseProduct;
    });
}
//# sourceMappingURL=create-purchase-products.js.map