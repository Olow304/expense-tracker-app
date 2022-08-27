import { z } from "zod";
import { createRouter } from "./context";

export const deleteExpneseRouter = createRouter().mutation("delete-expense", {
  input: z.object({
    expenseId: z.string(),
  }),
  async resolve({ ctx, input }) {
    // check if expense exists
    const expense = await ctx.prisma.expense.findUnique({
        where: {
            id: input.expenseId
        }
    });

    if (!expense) {
      throw new Error("expense does not exists");
    }

    // detele expense from database
    return await ctx.prisma.expense.delete({
        where: {
            id: input.expenseId
        }
    });
  },
});
