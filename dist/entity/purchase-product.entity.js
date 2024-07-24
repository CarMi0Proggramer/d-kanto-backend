"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseProduct = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const purchase_entity_1 = require("./purchase.entity");
const column_transformer_1 = require("../column-transformer");
let PurchaseProduct = class PurchaseProduct {
};
exports.PurchaseProduct = PurchaseProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_entity_1.Purchase, purchase => purchase.purchaseProducts, { onDelete: 'CASCADE' }),
    __metadata("design:type", purchase_entity_1.Purchase)
], PurchaseProduct.prototype, "purchase", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.purchaseProducts),
    __metadata("design:type", product_entity_1.Product)
], PurchaseProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "totalPrice", void 0);
exports.PurchaseProduct = PurchaseProduct = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseProduct);
//# sourceMappingURL=purchase-product.entity.js.map