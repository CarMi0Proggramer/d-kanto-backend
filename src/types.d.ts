type Product = {
    readonly id: number,
    name: string,
    category: string,
    description: string,
    price: number,
    rating: number,
    stock: number,
    urlimg: string,
    purchaseProducts: Array<any>
}

type lineItem = {
    data: Product,
    quantity: number
}