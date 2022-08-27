import { createRouter } from "./context";
import { resetPasswordInputSchema } from "../inputs/resetPassword";
import bcrypt from 'bcryptjs';

// create a function that will hash and compare passwords return string not promise
const hashPasswordSync = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const resetpasswordRouter = createRouter().mutation("reset-password", {
  input: resetPasswordInputSchema,
  async resolve({ ctx, input }) {
    // find user in the database and see if they have a password reset request
    const findUser = await ctx.prisma.user.findUnique({
        where: {
            email: input.email,
        },
    });

    if (!findUser) {
        throw new Error("User does not exist");
    }

    if (!findUser.isPaswordResetRequest) {
        throw new Error("User does not have a password reset request");
    }

    // update the password in the database with the new password
    const hashed = hashPasswordSync(input.password);
    return await ctx.prisma.user.update({
        where: {
            id: findUser.id,
        },
        data: {
            password: hashed,
            isPaswordResetRequest: false,
        },
    });
  },
});
