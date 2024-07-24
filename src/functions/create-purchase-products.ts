import { Product } from "../entity/product.entity";
import { PurchaseProduct } from "../entity/purchase-product.entity";
import { Purchase } from "../entity/purchase.entity";

type lineItem = {
    data: Product,
    quantity: number
}
export function createPurchaseProducts(items: lineItem[], purchase: Purchase) {
    return items.map( item => {
        const purchaseProduct = new PurchaseProduct();
        
        purchaseProduct.product = item.data;
        purchaseProduct.purchase = purchase;
        purchaseProduct.quantity = item.quantity;
        purchaseProduct.totalPrice = Math.round((item.quantity * item.data.price) * 100) / 100;

        return purchaseProduct;
    });
}