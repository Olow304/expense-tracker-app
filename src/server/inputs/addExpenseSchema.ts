import { z } from "zod";

export const addExpenseInputSchema = z.object({
    amount: z.number(),
    description: z.string(),
    category: z.string(),
    userEmail: z.string(),
    color: z.string(),
    transactionType: z.string(),
})

export type addExpenseInput = z.TypeOf<typeof addExpenseInputSchema>;