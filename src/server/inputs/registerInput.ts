import { z } from "zod";

export const registerInputSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
})

export type registerInput = z.TypeOf<typeof registerInputSchema>;