import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ColumnNumericTransformer } from "../column-transformer"
import { PurchaseProduct } from "./purchase-product.entity"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'numeric', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
    price: number

    @Column()
    description: string

    @Column()
    urlimg: string

    @Column()
    category: string

    @Column({ type: 'numeric', precision: 2, scale: 1, transformer: new ColumnNumericTransformer() })
    rating: number

    @Column({type: "int", nullable:false})
    stock: number

    @OneToMany(() => PurchaseProduct, purchaseProduct => purchaseProduct.product)
    purchaseProducts: PurchaseProduct[];
}