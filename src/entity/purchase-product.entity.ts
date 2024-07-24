import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Purchase } from "./purchase.entity";
import { ColumnNumericTransformer } from "../column-transformer";

@Entity()
export class PurchaseProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, purchase => purchase.purchaseProducts, { onDelete: 'CASCADE' })
    purchase: Purchase;

    @ManyToOne(() => Product, product => product.purchaseProducts)
    product: Product;

    @Column()
    quantity: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
    totalPrice: number;
}
