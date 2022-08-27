import { z } from "zod";

export const resetPasswordInputSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
    email: z.string(),
})

export type resetPasswordInput = z.TypeOf<typeof resetPasswordInputSchema>;