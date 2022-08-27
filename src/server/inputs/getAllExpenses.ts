import { z } from "zod";

export const getAllExpensesInputSchema = z.object({
    amount: z.number(),
    description: z.string(),
    category: z.string(),
    createdAt: z.string(),
})

export type getAllExpensesInput = z.TypeOf<typeof getAllExpensesInputSchema>;