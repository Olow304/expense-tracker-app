import { nullable } from 'zod';
import { addExpenseInputSchema } from '../inputs/addExpenseSchema';
import { createRouter } from './context';


export const addExpenseRouter = createRouter().mutation("add-expense", {
    input: addExpenseInputSchema,
    async resolve({ ctx, input }) {
        // find user by userEmail
        const user = await ctx.prisma.user.findUnique({
            where: {
                email: input.userEmail
            }
        });

        // if user not found, throw error
        if (!user) {
            throw new Error("User not found");
        }

        // create expense
        return await ctx.prisma.expense.create({
            data: {
                userId: user.id,
                description: input.description,
                amount: input.amount,
                category: input.category,
                color: input.color,
                transactionType: input.transactionType
            }
        });
    }

});