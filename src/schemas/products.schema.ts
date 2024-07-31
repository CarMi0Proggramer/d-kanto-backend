import { SafeParseSuccess, z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    price: z
        .number()
        .positive({ message: "Price must be a positive number" })
        .max(10000, { message: "Price must be less than 10000" }),
    description: z.string().min(50, {message: "Description must be at least of 50 characters"}),
    urlimg: z.string().url({ message: "Invalid URL" }),
    category: z.string().min(1, { message: "Category is required" }),
    rating: z
        .number()
        .min(0)
        .max(5, { message: "Rating must be between 0 and 5" }).default(5),
    stock: z.number().positive({message: "Stock must be a positive number"}).min(1, {message: "Stock must be at least 1"})
});

export function validateProduct(data: any) {
    const result = productSchema.safeParse(data);
        if (!result.success) {
            return JSON.parse(result.error.message);
        }

    return result.data;
}

export function validatePartialProduct(data: any) {
    const result = productSchema.partial().safeParse(data);
        if (!result.success) {
            return JSON.parse(result.error.message);
        }

    return result.data;
}
