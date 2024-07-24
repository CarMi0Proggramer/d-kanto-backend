import { myDataSource } from "../app-data-source";
import { PurchaseProduct } from "../entity/purchase-product.entity";

export async function savePurchaseProducts(purchaseProducts: PurchaseProduct[]) {
    const repository = myDataSource.getRepository(PurchaseProduct);
    
    for (const purchaseProduct of purchaseProducts) {
        repository.save(purchaseProduct);
    }
}