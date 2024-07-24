import z from "zod";

const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }),
});

export function validateUser(data: any) {
    const result = userSchema.safeParse(data);

    if (!result.success) {
        return JSON.parse(result.error.message);
    }

    return result.data;
}

export function validatePartialUser(data: any) {
    const result = userSchema.partial().safeParse(data);

    if (!result.success) {
        return JSON.parse(result.error.message);
    }

    return result.data;
}