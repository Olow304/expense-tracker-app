import { z } from "zod";

export const addCategoryInputSchema = z.object({
    name: z.string(),
})

export type addCategoryInput = z.TypeOf<typeof addCategoryInputSchema>;