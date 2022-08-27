import { loginInputSchema } from "./../inputs/loginInput";
import { createRouter } from "./context";
import * as jose from "jose";
import bcrypt from "bcryptjs";

// create a function that will compare passwords return true or false not promise
const comparePasswordSync = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const loginRouter = createRouter().mutation("login", {
  input: loginInputSchema,
  async resolve({ ctx, input }) {
    const { publicKey, privateKey } = await jose.generateKeyPair("PS256");

    // get password from user in the database
    const findUser = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!findUser) {
      throw new Error("User does not exist");
    }
    // compare password from user input with password from database
    const isMatch = comparePasswordSync(input.password, findUser.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    // create a token
    // create jwt token for user and return it, using jose library
    const token = await new jose.SignJWT({ "urn:expense:com:user": true })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setIssuer(input.email)
      .setSubject(findUser.name)
      .setExpirationTime("12h")
      .sign(privateKey);

    // check if isPaswordResetRequest is true, if true, set it to false
    // Edge case, where user requests password reset and forgets to reset it.
    if (findUser.isPaswordResetRequest) {
      await ctx.prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          isPaswordResetRequest: false,
        },
      });
    }

    return {
      token,
      username: findUser.name,
      userEmail: findUser.email,
    };
  },
});
