import { getExpenseInputSchema } from '../inputs/getExpnseSchema';
import { createRouter } from './context';


export const getCategoriesRouter = createRouter().query("get-categories", {
    async resolve({ ctx }) {
        return await ctx.prisma.category.findMany()
    }
});