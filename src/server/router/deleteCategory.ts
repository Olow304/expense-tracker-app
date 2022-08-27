import { addCategoryInputSchema } from './../inputs/addCategory';
import { createRouter } from "./context";

export const deleteCategoryRouter = createRouter().mutation("delete-category", {
  input: addCategoryInputSchema,
  async resolve({ ctx, input }) {

    // check if category already exists
    const category = await ctx.prisma.category.findUnique({
        where: {
            name: input.name,
        },
    });

    if (!category) {
        throw new Error("Category does not exists");
    }

    // detele category from database using prisma client and return the result
    return await ctx.prisma.category.delete({
        where: {
            name: input.name,
        }
    });
  },
});
