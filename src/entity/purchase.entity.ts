import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany} from "typeorm"
import { User } from "./user.entity";
import { ColumnNumericTransformer } from "../column-transformer";
import { PurchaseProduct } from "./purchase-product.entity";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.purchases)
    user: User

    @OneToMany(() => PurchaseProduct, purchaseProduct => purchaseProduct.product)
    purchaseProducts: PurchaseProduct[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ type: 'numeric', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
    total_amount: number;
}