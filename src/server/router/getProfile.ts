import { getExpenseInputSchema } from '../inputs/getExpnseSchema';
import { createRouter } from './context';
import z from 'zod';

export const getProfileRouter = createRouter().query("get-profile", {
    input: z.object({
        email: z.string()
    }),
    async resolve({ ctx, input }) {        
        // find user by userEmail and update profile
        const user = await ctx.prisma.user.findUnique({
            where: {
                email: input.email
            }
        });

        // if user not found, throw error
        if (!user) {
            throw new Error("User not found");
        }

        // get profile
        return await ctx.prisma.user.findUnique({
            where: {
                email: input.email
            }
        });
    }
});