import z from "zod";

export const adminSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(5, { message: "Password must have at least 5 characters" }),
    company_key: z.string().min(1, { message: "Company Password is required" })
});

export function validateAdmin(data: any){
    /* validating data */
    const result = adminSchema.safeParse(data);
    
    if (!result.success) {
        return JSON.parse(result.error.message);
    }else if (result.data.company_key != process.env.COMPANY_KEY) {
        return false;
    }

    return result.data;
}

export function validatePartialAdmin(data: any) {
    /* validating partial data */
    const result = adminSchema.partial().safeParse(data);

    if (!result.success) {
        return JSON.parse(result.error.message);
    }else if (result.data.company_key != process.env.COMPANY_KEY) {
        return false;
    }

    return result.data;
}