import z from "zod";

const lineItemSchema = z.object({
    data: z.object({
        id: z.number().positive(),
        name: z.string(),
        price: z.number().positive(),
        description: z.string(),
        urlimg: z.string().url(),
        category: z.string(),
        rating: z.number().positive(),
        stock: z.number(),
    }),
    quantity: z.number().positive()
})

const purchaseSchema = z.object({
    lineItems: z.array(lineItemSchema),
    total_amount: z.number().positive()
});

export function validatePurchaseData(data: any)  {
    const result = purchaseSchema.safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }

    return result.data;
}

export function validatePartialPurchaseData(data: any) {
    const result = purchaseSchema.partial().safeParse(data);
    if (!result.success) {
        return JSON.parse(result.error.message);
    }

    return result.data;
}
