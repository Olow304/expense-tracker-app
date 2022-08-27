import { getExpenseInputSchema } from '../inputs/getExpnseSchema';
import { createRouter } from './context';


export const getExpenseRouter = createRouter().query("get-expense", {
    input: getExpenseInputSchema,
    async resolve({ ctx, input }) {
        // query the database for the user with the email and return the user id
        if (!input.userEmail) {
            throw new Error("User email is required");
        }
        const user = await ctx.prisma.user.findUnique({
            where: {
                email: input.userEmail.toLowerCase(),
            },
        });

        if (!user) {
            throw new Error("User does not exist");
        }

        // get expense from database using prisma client and return the result
        // find expense where userId is equal to user.id
        const expense = await ctx.prisma.expense.findMany({
            where: {
                userId: user.id,
            },
        });
        return expense;
    }

});