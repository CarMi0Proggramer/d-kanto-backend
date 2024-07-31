import { myDataSource } from "../app-data-source";
import { Purchase } from "../entity/purchase.entity";
import { createPurchaseProducts } from "../functions/create-purchase-products";
import { savePurchaseProducts } from "../functions/save-purchase-products";
import { UserModel } from "./user";

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
        const purchase = new Purchase();

        const user = await UserModel.getByEmail(userEmail);
        purchase.user = user;
        purchase.total_amount = total_amount;

        const purchaseProducts = createPurchaseProducts(items, purchase);
        purchase.purchaseProducts = purchaseProducts;

        await myDataSource.getRepository(Purchase).save(purchase);
        savePurchaseProducts(purchaseProducts);

        return purchase;
    }
}
