import { sendEmail } from "../../utils/mailer";
import { forgotpasswordSchema } from "../inputs/forgotpassword";
import { createRouter } from "./context";
import * as jose from "jose";

export const forgotpasswordRouter = createRouter().mutation("forgot-password", {
  input: forgotpasswordSchema,
  async resolve({ ctx, input }) {
    const { publicKey, privateKey } = await jose.generateKeyPair("PS256");

    // generate a token to send to user with their email
    const token = await new jose.SignJWT({ "urn:expense:com:user": true })
        .setProtectedHeader({ alg: "RS256" })
        .setIssuedAt()
        .setIssuer(input.email)
        .setExpirationTime("5m")
        .sign(privateKey);


    const url = `http://localhost:3000/reset-password#token=${token}`;
    // get mailer and send email
    sendEmail(input.email, url);

    // set isPaswordResetRequest to true in the database for the user 
    return await ctx.prisma.user.update({
        where: {
            email: input.email,
        },
        data: {
            isPaswordResetRequest: true,
        },
    });
    
  },
});
