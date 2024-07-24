import { myDataSource } from "../app-data-source";
import { Product } from "../entity/product.entity";
import { Purchase } from "../entity/purchase.entity";
import { createPurchaseProducts } from "../functions/create-purchase-products";
import { savePurchaseProducts } from "../functions/save-purchase-products";
import { UserModel } from "./user";

type lineItem = {
    data: Product,
    quantity: number
}
export class PurchaseModel {
    static async getAll() {
        const purchases = await myDataSource.getRepository(Purchase).find();
        return purchases;
    }

    static async create(
        userEmail: string,
        items: lineItem[],
        total_amount: number
    ) {
        const user = await UserModel.getByEmail(userEmail);

        const purchase = new Purchase();
        purchase.user = user;
        purchase.total_amount = total_amount;
        
        const purchaseProducts = createPurchaseProducts(items, purchase);
        purchase.purchaseProducts = purchaseProducts;

        await myDataSource.getRepository(Purchase).save(purchase);
        savePurchaseProducts(purchaseProducts);

        return purchase;
    }
}
