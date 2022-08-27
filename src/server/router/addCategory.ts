import { addCategoryInputSchema } from './../inputs/addCategory';
import { createRouter } from "./context";

export const addCategoryRouter = createRouter().mutation("add-category", {
  input: addCategoryInputSchema,
  async resolve({ ctx, input }) {

    // check if category already exists
    const category = await ctx.prisma.category.findUnique({
        where: {
            name: input.name.toLowerCase(),
        },
    });

    if (category) {
        throw new Error("Category already exists");
    }

    // add category to database using prisma client and return the result
    return await ctx.prisma.category.create({
        data: {
            name: input.name.toLowerCase(),
        },
    });
    
  },
});
