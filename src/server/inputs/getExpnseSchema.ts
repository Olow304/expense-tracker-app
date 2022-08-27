import { z } from "zod";

export const getExpenseInputSchema = z.object({
    userEmail: z.string(),
})

export type getExpenseInput = z.TypeOf<typeof getExpenseInputSchema>;