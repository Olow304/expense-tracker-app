import { updateProfileInputSchema } from './../inputs/updateProfile';
import { createRouter } from "./context";
import fs from "fs";


export const updateProfileRouter = createRouter().mutation("update-profile", {
  input: updateProfileInputSchema,
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

    // update profile
    return await ctx.prisma.user.update({
        where: {
            email: input.email
        },
        data: {
            name: input.name,
            gender: input.gender
        }
    });
  },
});
